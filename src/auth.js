const login = (req, res) => {
  res.send({ hello: 'world' })
}

const logout = (req, res) => {
  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

const register = (req, res) => {
  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

const password = (req, res) => {
  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

module.exports = (app) => {
  app.post('/login', login)
  app.put('/logout', logout)
  app.post('/register', register)
  app.put('/password', password)
}