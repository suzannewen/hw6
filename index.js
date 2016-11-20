const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const User = require('./model').User

const cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin)

  if (req.method === 'OPTIONS') {
    res.status(200).send('OK')
  }
  else {
    next()
  }
}

const isLoggedIn = (req, res, next) => {
  const username = req.body.username
  if (req.cookie) {
    const cookie = req.cookie

      const userObj = User.find( { username: username } )

      if (!userObj) {
        return res.status(401).send('Unauthorized')
      }
      else {
        res.cookie(cookie)
        return res.status(200).send('OK')
      }

  }
  else {
    return res.status(401).send('Unauthorized')
  }
}

const app = express()
app.use(bodyParser.json())
app.use(cors)
// app.use(isLoggedIn)

require('./src/auth')(app)
require('./src/profile')(app)
require('./src/articles')(app)
require('./src/following')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
