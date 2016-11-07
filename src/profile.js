const profile = {
        username: 'FooBar',
        headline: 'This is my headline!',
        email: 'foo@bar.com',
        zipcode: 12345,
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
    }

const getHeadlines = (req, res) => {

    // we will want middleware to supply this value
    // for now we provide a default
    if (!req.user) req.user = profile.username
    const users = req.params.users ? req.params.users.split(',') : [req.user]

    // this returns only one headline, but we want to send
    // an array of all the requested user's headlines
    // res.send({ headlines: [ 
    //     { username: users[0], headline: headlines[users[0]] } 
    // ] })

    // Implement the logic to return headlines for all requested users
    // each user has a default value.  Only the "req.user" value ever changes.

    if (profile.username === users) { //how to check for multiple profiles??
     res.send({ headlines: [ { username: req.user, headline: profile.headline } ] })
     return
    }

    res.send({ headlines: [ { username: req.user, headline: profile.headline } ] })
}

const updateHeadline = (req, res) => {
  profile.headline = req.body.headline
  res.send({ headlines: [ { username: profile.username, headline: profile.headline } ] })
}

const getEmail = (req, res) => {
    if (!req.user) req.user = 'Scott'
    const users = req.params.users ? req.params.users.split(',') : [req.user]

  res.send( { email: profile.email } )
}

const updateEmail = (req, res) => {
  profile.email = req.body.email
  res.send( { email: profile.email } )
}

const getDOB = (req, res) => {
  res.send( { username: 'loggedInUser', dob: 'milliseconds' } )
}

const getZipcode = (req, res) => {
  res.send({ zipcode: profile.zipcode })
}

const updateZipcode = (req, res) => {
  profile.zipcode = req.body.zipcode
  res.send( { zipcode: profile.zipcode } )
}

const getAvatars = (req, res) => {
  res.send({ avatar: profile.avatar })
}

const updateAvatars = (req, res) => {
  profile.avatar = req.body.avatar
  res.send({ avatar: profile.avatar })
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