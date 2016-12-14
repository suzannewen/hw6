const redis = require('redis').createClient('redis://h:p22it5ennqcj5912vjo7tnq9k11@ec2-54-221-238-190.compute-1.amazonaws.com:10729')
const md5 = require('md5')
const User = require('../model').User
const Profile = require('../model').Profile

//replace with redis
const sessionUser = {}
const cookieKey = 'sid'

const isLoggedIn = (req, res, next) => {
  const sessionKey = req.cookies[cookieKey]
  let username = ''

  if (!sessionKey) {
    return res.status(404).send( 'Unauthorized' )
  }

  if(req.isAuthenticated()) {
    next()
  }

  // const username = sessionUser[sessionKey].username //gets username from userObj
  redis.hgetall(sessionKey, function(err, userObj) {
    username = userObj.username

    if (username) {
      req.username = username
      next()
    }
    else {
      return res.status(404).send( 'Unauthorized' )
    }
  })
}

const login = (req, res) => {
  const mySecretMessage = "secretterces"
  const username = req.body.username
  const password = req.body.password
  // let userObj = {}

  User
    .findOne( { username: username } )
    .exec( (err, foundUser) => {
      //if username is not found, then return 404 status code
      if (foundUser === null) {
        return res.status(404).send( 'This username has not been registered.' )
      }

      //if it is found, check if that password is correct
      const checkPW = md5(password + foundUser.salt)
      if (foundUser.hash === checkPW) {
        const sessionKey = md5(mySecretMessage + new Date().getTime() + foundUser.username)
        redis.hmset(sessionKey, foundUser, function (err, res) {})
        res.cookie(cookieKey, sessionKey, { maxAge: 3600*1000, httpOnly: true})
        return res.status(200).send( { username: username, result: 'success' } )
      }
      else {
        return res.status(404).send( 'Password was not correct.' )
      }
    })
}

const logout = (req, res) => {
  // delete sessionUser[req.cookies[cookieKey]] //deletes mapping
  redis.del(req.cookies[cookieKey])

  return res.status(200).send('OK')
}

const register = (req, res) => {
  const username = req.body.username
  const password = req.body.password

  User
    .findOne( { username: username } )
    .exec( (err, foundUser) => {
      if (foundUser !== null) {
        return res.status(404).send( 'Username has already been used on another account.' )
      }

    const salt = username + new Date().getTime()
    const hash = md5(password + salt)

    const newUser = new User({ 
      username: username,
      salt: salt,
      hash: hash,
     })

    const mySecretMessage = "secretterces"
    const sessionKey = md5(mySecretMessage + new Date().getTime() + username)
    // sessionUser[sessionKey] = newUser

    console.log("sessionKey" + sessionKey)
    console.log("new user" + newUser)

    redis.hmset(sessionKey, newUser, function (err, res) {})
    redis.hgetall(sessionKey, function(err, userObj) {
      console.log("mapped register")
      console.log(userObj)
    })

    const newProfile = new Profile({ 
      username: username,
      status: "I'm a new user",
      following: [ ],
      email: req.body.email,
      dob: req.body.dob,
      zipcode: req.body.zipcode,
      picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'  
     })
    
    newUser.save( (err) => {
      if (err) { console.log(err) }
    })

    newProfile.save( (err) => {
      if (err) { console.log(err) }
    })

    res.cookie(cookieKey, sessionKey, { maxAge: 3600*1000, httpOnly: true})
    return res.status(200).send( { username: username, result: 'successfully registered'} )
  })
}

const changePassword = (req, res) => {
  const username = req.username
  const newSalt = username + new Date().getTime()

  //updates salt and also hash when password is changed
  User
    .findOneAndUpdate( { username: username }, { salt: newSalt } )
    .exec( (err, foundUser) => {
        const newHash = md5(req.body.password + newSalt)

        User
          .findOneAndUpdate( { username: username }, { hash: newHash } )
          .exec( (err, foundUser) => {
              return res.send( { username: username , result: 'new password set'} )
          })
    })
}

module.exports = (app) => {
  app.post('/login', login)
  app.post('/register', register)
  app.use(isLoggedIn)
  app.put('/logout', logout)
  app.put('/password', changePassword)
}