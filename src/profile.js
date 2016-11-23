const uploadImage = require('./upload')
const User = require('../model').User
const Profile = require('../model').Profile

const getHeadlines = (req, res) => {
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
        console.log(foundUser)
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
  // const users = req.params.users ? req.params.users.split(',') : [req.user]
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
  // const dob = new Date()
  Profile
    .findOne( { username: req.username } )
    .exec( (err, foundUser) => {
      console.log('dob =' + foundUser.dob.getMilliseconds())
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
  // console.log(req.params.user)
  let user = ''
  if (!req.params.user) {
    user = req.username
  }
  else {
    user = req.params.user
  }
  // const users = req.params.users ? req.params.users.split(',') : [req.user]
  Profile
    .findOne( { username: user } )
    .exec( (err, foundUser) => {
        res.send( { username: req.username, avatar: foundUser.picture } )
    })
}

const uploadAvatar = (req, res) => {
  console.log(req)
     // create an image tag from the cloudinary upload
   const image = cloudinary.image(req.fileid, {
       format: "png", width: 100, height: 130, crop: "fill" 
   })
   // create a response to the user's upload
   res.send(`Uploaded: ${req.fileurl}<br/><a href="${req.fileurl}">${image}</a>`);
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
    app.post('/avatar', uploadImage('new avatar'), uploadAvatar)
}