const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../model').User
const Profile = require('../model').Profile

// const app = express()
var users = []

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
  console.log(profile)
  const username = profile.displayName + '@Facebook'

  User
    .findOne( { username: username } )
    .exec( (err, foundUser) => {
      if (foundUser === null) {
        const newUser = new User({ 
            username: profile.displayName + '@Facebook',
            salt: '',
            hash: ''
        })

        const newProfile = new Profile({ 
            username: profile.displayName + '@Facebook',
            status: "I'm a new user",
            following: [ ],
            email: '',
            dob: '',
            zipcode: '',
            picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'  
        })

      }
  console.log(newUser)
  console.log(newProfile)
})
    
    // newUser.save( (err) => {
    //   if (err) { console.log(err) }
    // })

    // newProfile.save( (err) => {
    //   if (err) { console.log(err) }
    // })

  process.nextTick(function () {
    return done(null, profile)
  })
}))

module.exports = (app) => {
  app.get('/auth/callback', passport.authenticate('facebook', { successRedirect: 'http://localhost:8080', failureRedirect: '/logout'}))
  app.get('/auth/login', passport.authenticate('facebook', { scope: 'email' }))
}