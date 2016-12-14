const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const session = require('express-session')
// const User = require('./model').User

const cors = (req, res, next) => {
  const length = req.headers.referer.length
  const origin = req.headers.referer.substring(0, length - 1)
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.setHeader("Access-Control-Allow-Origin", origin)
  res.setHeader("Access-Control-Expose-Headers", "X-Requested-With, X-Session-Id")

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
app.use(session({ secret: 'secretterces' }))
app.use(passport.initialize())
app.use(passport.session())

require('./src/authFB')(app)
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
