// this is profile.js which contains all user profile 
// information except passwords which is in auth.js

const profile = {
        headline: 'This is my headline!',
        email: 'foo@bar.com',
        zipcode: 12345,
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
    }

const getHeadlines = (req, res) => {

    // we will want middleware to supply this value
    // for now we provide a default
    if (!req.user) req.user = 'Scott'
    const users = req.params.users ? req.params.users.split(',') : [req.user]

    // this returns only one headline, but we want to send
    // an array of all the requested user's headlines
    res.send({ headlines: [ 
        { username: users[0], headline: headlines[users[0]] } 
    ] })

    // Implement the logic to return headlines for all requested users
    // each user has a default value.  Only the "req.user" value ever changes.
}

const updateHeadline = (req, res) => {
  res.send({ hello: 'world' })
}

const getEmail = (req, res) => {
    if (!req.user) req.user = 'Scott'
    const users = req.params.users ? req.params.users.split(',') : [req.user]

  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

const updateEmail = (req, res) => {
  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

const getDOB = (req, res) => {
  res.send({ hello: 'world' })
}

const getZipcode = (req, res) => {
    if (!req.user) req.user = 'Scott'
    const users = req.params.users ? req.params.users.split(',') : [req.user]

  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

const updateZipcode = (req, res) => {
  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

const getAvatars = (req, res) => {
  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

const updateAvatars = (req, res) => {
  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
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