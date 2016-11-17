const express = require('express')
const session = require('express-session')
const passport = require('passport')
const md5 = require('md5')

const FacebookStrategy = require('passport-facebook').Strategy

const app = express()
var users = []

app.use(session({ secret: 'This is the secret message' }))
app.use(passport.initialize())
app.use(passport.session())

const clientSecret = '683860abd11f3c8844f5086f238b62c1'
const clientID = '1791594551114737'
const callbackURL = 'http://localhost:3000/auth/callback'

const config = { clientSecret, clientID, callbackURL }

passport.serializeUser(function (user, done) {
  users[user.id] = user
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  var user = users[id]
  done(null, user)
})

passport.use(new FacebookStrategy(config, function (token, refreshToken, profile, done) {
  process.nextTick(function () {
    return done(null, profile)
  })
}))

const login = (req, res) => {
  const mySecretMessage = "secretterces"
  const username = req.body.username
  const password = req.body.password
  const checkPW = md5(password + userObj.salt)

  const userObj = User.find( { username: username })
  if (userObj.hash === checkPW) {
    const sessionKey = md5(mySecretMessage + new Date().getTime() + userObj.username)
    sessionUser[sessionKey] = userObj

    res.cookie(cookieKey, sessionKey, { maxAge: 3600*1000, httpOnly: true})
  }

  res.send( { username: 'Suzanne'}, { result: 'unauthroized' } )
}

const isLoggedIn = (req, res) => {
  res.send( { username: 'Suzanne' }, { result: 'success'} )
}

const logout = (req, res) => {
  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

const register = (req, res) => {
  //still needs to get username...etc.

  const salt = username + new Date().getTime()
  const hash = md5(password + salt)

  const newUser = new User({ 
    name: username
    salt: salt,
    hash: hash
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

  res.send( { username: 'Suzanne' }, { result: 'success'} )
}

const password = (req, res) => {
  res.send( { username: 'Suzanne' }, { result: 'new password set'} )
}

module.exports = (app) => {
  app.get('/auth/login', passport.authenticate('facebook', { scope: 'email' }))
  app.get('/auth/callback', passport.authenticate('facebook', { successRedirect: '/login', failureRedirect: '/logout'}))
  app.post('/login', login)
  app.put('/logout', logout)
  app.post('/register', register)
  app.put('/password', password)
}