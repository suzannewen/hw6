const uploadImage = require('./upload')

const profiles = [ {
        username: 'FooBar',
        headline: 'This is my headline!',
        email: 'foo@bar.com',
        zipcode: 12345,
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'
} ]

const getHeadlines = (req, res) => {

    if (!req.user) req.user = profiles[0].username
    const users = req.params.users ? req.params.users.split(',') : [req.user]

    if (profiles[0].username === users) { //how to check for multiple profiles??
     res.send({ headlines: [ { username: req.user, headline: profiles[0].headline } ] })
     return
    }

    res.send({ headlines: [ { username: req.user, headline: profiles[0].headline } ] })
}

const updateHeadline = (req, res) => {
  profiles[0].headline = req.body.headline
  res.send({ headlines: [ { username: profiles[0].username, headline: profiles[0].headline } ] })
}

const getEmail = (req, res) => {
    if (!req.user) req.user = 'Scott'
    const users = req.params.users ? req.params.users.split(',') : [req.user]

  res.send( { email: profiles[0].email } )
}

const updateEmail = (req, res) => {
  profiles[0].email = req.body.email
  res.send( { email: profiles[0].email } )
}

const getDOB = (req, res) => {
  res.send( { username: 'loggedInUser', dob: 'milliseconds' } )
}

const getZipcode = (req, res) => {
  res.send({ zipcode: profiles[0].zipcode })
}

const updateZipcode = (req, res) => {
  profiles[0].zipcode = req.body.zipcode
  res.send( { zipcode: profiles[0].zipcode } )
}

const getAvatars = (req, res) => {
  res.send({ avatar: profiles[0].avatar })
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