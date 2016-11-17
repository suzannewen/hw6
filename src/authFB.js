const express = require('express')
const session = require('express-session')
const passport = require('passport')
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

module.exports = (app) => {
  app.get('/auth/login', passport.authenticate('facebook', { scope: 'email' }))
  app.get('/auth/callback', passport.authenticate('facebook', { successRedirect: '/login', failureRedirect: '/logout'}))
}