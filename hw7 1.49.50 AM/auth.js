const express = require('express')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const app = express()

app.use(session({ secret: '683860abd11f3c8844f5086f238b62c1' }))
app.use(passport.initialize())
app.use(passport.session())

const clientSecret = '683860abd11f3c8844f5086f238b62c1'
const clientID = '1791594551114737'
const callbackURL = 'https://suz-ricebook.surge.sh'

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
  res.send( { username: 'Suzanne' }, { result: 'success'} )
}

const logout = (req, res) => {
  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

const register = (req, res) => {
  console.log(req)
  res.send( { username: 'Suzanne' }, { result: 'success'} )
}

const password = (req, res) => {
  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

module.exports = (app) => {
  app.post('/login', login)
  app.put('/logout', logout)
  app.post('/register', register)
  app.put('/password', password)
  app.get('/auth/login', passport.authenticate('facebook', { scope: 'email' }))
  app.get('/auth/callback', passport.authenticate('facebook', { successRedirect: '/login', failureRedirect: '/logout'}))
}