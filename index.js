const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')

const cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Headers", "Authorization", "Content-type")
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE")
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE")
//     'Allow-Origin': req.get('origin'),
//     'Credentials': 'true',
//     'Methods': 'GET, PUT, DELETE, POST',
//     'Headers': 'Authorization, Content-Type'
// })

  if (req.method === 'OPTIONS') {
    res.status(200)
  }

  next()
}

const app = express()
app.use(bodyParser.json())
app.use(cors)

require('./src/profile')(app)
require('./src/articles')(app)
require('./src/following')(app)
require('./src/auth')(app)



// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
