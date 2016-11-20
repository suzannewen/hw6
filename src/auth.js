const md5 = require('md5')
const _ = require('lodash');
const User = require('../model').User
const Profile = require('../model').Profile

const sessionUser = {}
const cookieKey = 'sid'

const login = (req, res) => {
  const mySecretMessage = "secretterces"
  const username = req.body.username
  const password = req.body.password
  const userObj = User.find( { username: username } )
  console.log(userObj)
  const checkPW = md5(password + userObj.salt)

  if (userObj.hash === checkPW) {
    const sessionKey = md5(mySecretMessage + new Date().getTime() + userObj.username)
    sessionUser[sessionKey] = userObj
    console.log(sessionUser)

    res.cookie(cookieKey, sessionKey, { maxAge: 3600*1000, httpOnly: true})
  }

  res.send( { username: 'Suzanne', result: 'unauthroized' } )
}

const logout = (req, res) => {
  const username = req.username
  const userObj = User.find( { username: username } )

  const key = _.findKey( sessionUser, userObj )
  delete sessionUser[key]

  res.status(200).send('OK')
}

const register = (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email
  const zipcode = req.body.zipcode

  const salt = username + new Date().getTime()
  const hash = md5(password + salt)

  const newUser = new User({ 
    username: username,
    salt: salt,
    hash: hash,
   })

  const newProfile = new Profile({ 
    username: username,
    status: "I'm a new user",
    following: [ ],
    email: email,
    zipcode: zipcode,
    picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'  
   })
  
  newUser.save(function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('saved user')
    }
  })

  newProfile.save(function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('saved profile')
    }
  })

  res.status(200).send({ username: username, result: 'successfully registered'})
}

const changePassword = (req, res) => {
  res.send( { username: 'Suzanne' }, { result: 'new password set'} )
}

module.exports = (app) => {
  app.post('/login', login)
  app.put('/logout', logout)
  app.post('/register', register)
  app.put('/password', changePassword)
}