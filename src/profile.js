const profiles = [ {
        username: 'FooBar',
        headline: 'This is my headline!',
        email: 'foo@bar.com',
        zipcode: 12345,
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'
} ]

const getHeadlines = (req, res) => {

    // we will want middleware to supply this value
    // for now we provide a default
    if (!req.user) req.user = profile[0].username
    const users = req.params.users ? req.params.users.split(',') : [req.user]

    // this returns only one headline, but we want to send
    // an array of all the requested user's headlines
    // res.send({ headlines: [ 
    //     { username: users[0], headline: headlines[users[0]] } 
    // ] })

    // Implement the logic to return headlines for all requested users
    // each user has a default value.  Only the "req.user" value ever changes.

    if (profile[0].username === users) { //how to check for multiple profiles??
     res.send({ headlines: [ { username: req.user, headline: profile[0].headline } ] })
     return
    }

    res.send({ headlines: [ { username: req.user, headline: profile[0].headline } ] })
}

const updateHeadline = (req, res) => {
  profile[0].headline = req.body.headline
  res.send({ headlines: [ { username: profile[0].username, headline: profile[0].headline } ] })
}

const getEmail = (req, res) => {
    if (!req.user) req.user = 'Scott'
    const users = req.params.users ? req.params.users.split(',') : [req.user]

  res.send( { email: profile[0].email } )
}

const updateEmail = (req, res) => {
  profile[0].email = req.body.email
  res.send( { email: profile[0].email } )
}

const getDOB = (req, res) => {
  res.send( { username: 'loggedInUser', dob: 'milliseconds' } )
}

const getZipcode = (req, res) => {
  res.send({ zipcode: profile[0].zipcode })
}

const updateZipcode = (req, res) => {
  profile[0].zipcode = req.body.zipcode
  res.send( { zipcode: profile[0].zipcode } )
}

const getAvatars = (req, res) => {
  res.send({ avatar: profile[0].avatar })
}

const updateAvatars = (req, res) => {
  profile[0].avatar = req.body.avatar
  res.send({ avatar: profile[0].avatar })
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
    app.put('/avatar', updateAvatars)
}