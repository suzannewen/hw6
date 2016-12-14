const User = require('../model').User
const Profile = require('../model').Profile
const { uploadImage } = require('../uploadCloudinary')

console.log(uploadImage)

const getHeadlines = (req, res) => {
  console.log("HEADLINES")
  let users = []
  if (!req.params.users) {
    users.push(req.username)
  }
  else {
    users = req.params.users ? req.params.users.split(',') : [req.user]
  }

  Profile
    .find( { username: {  $in : users } } )
    .exec( (err, foundUsers) => {
        const headlineArray = foundUsers.map( (user) => {
        let headlineObj =  {username: user.username, headline: user.status}
        return headlineObj
      })
      res.send( { headlines: headlineArray } )
    })
}

const updateHeadline = (req, res) => {
  Profile
    .findOneAndUpdate( { username: req.username }, { status: req.body.headline } )
    .exec( (err, foundUser) => {
        res.send( { username: req.username, headline: req.body.headline } )
    })
}

const getEmail = (req, res) => {
  let user = ''
  if (!req.params.user) {
    user = req.username
  }
  else {
    user = req.user
  }

  Profile
    .findOne( { username: user } )
    .exec( (err, foundUser) => {
        res.send( { username: req.username, email: foundUser.email } )
    })
}

const updateEmail = (req, res) => {
  Profile
    .findOneAndUpdate( { username: req.username }, { email: req.body.email } )
    .exec( (err, foundUser) => {
        res.send( { username: req.username, email: req.body.email } )
    })
}

const getDOB = (req, res) => {
  Profile
    .findOne( { username: req.username } )
    .exec( (err, foundUser) => {
        res.send( { username: req.username, dob: foundUser.dob.getMilliseconds() } )
    })
}

const getZipcode = (req, res) => {
  Profile
    .findOne( { username: req.username } )
    .exec( (err, foundUser) => {
        res.send( { username: req.username, zipcode: foundUser.zipcode } )
    })
}

const updateZipcode = (req, res) => {
    Profile
    .findOneAndUpdate( { username: req.username }, { zipcode: req.body.zipcode } )
    .exec( (err, foundUser) => {
        res.send( { username: req.username, zipcode: req.body.zipcode } )
    })
}

const getAvatars = (req, res) => {
  let user = ''
  if (!req.params.user) {
    user = req.username
  }
  else {
    user = req.params.user
  }

  Profile
    .findOne( { username: user } )
    .exec( (err, foundUser) => {
        res.send( { username: req.username, avatar: foundUser.picture } )
    })
}

const uploadAvatar = (req, res) => {
    Profile
    .findOneAndUpdate( { username: req.username }, { picture: req.fileurl } )
    .exec( (err, foundUser) => {
        res.send( { username: req.username, avatar: req.fileurl } )
    })
}

module.exports = (app) => {
    app.get('/headlines/:users*?', getHeadlines)
    app.put('/headline', updateHeadline)
    app.get('/email/:user?', getEmail)
    app.put('/email', updateEmail)
    app.get('/dob', getDOB)
    app.get('/zipcode/:user?', getZipcode)
    app.put('/zipcode', updateZipcode)
    app.get('/avatars/:user?', getAvatars)
    app.put('/avatar', uploadImage('avatar'), uploadAvatar)
}