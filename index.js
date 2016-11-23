const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const User = require('./model').User

const cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.setHeader("Access-Control-Allow-Origin", "http://suzwen-ricebook.surge.sh")

  if (req.method === 'OPTIONS') {
    res.status(200).send('OK')
  }
  else {
    next()
  }
}

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors)

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
