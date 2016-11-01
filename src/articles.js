// const helloUser = (req, res) => {
//   const user = req.params.user || 'Somebody'
//   res.send('Hello ' + user + '!')
// }

// module.exports = (app) => {
//   app.get('/:user*?', helloUser)
// }

const postArticle = (req, res) => {
  res.send({ hello: 'world' })
}

const getArticles = (req, res) => {
  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

// Update the article :id with a new text if commentId not supplied. If commentId is supplied, then update the requested comment on the article. If commentId is -1, then a new comment is posted with the text message.
const updateArticle = (req, res) => {
  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

module.exports = (app) => {
  app.post('/article', postArticle)
  app.get('/articles/:id*?', getArticles)
  app.put('/articles/:id', updateArticle)
}