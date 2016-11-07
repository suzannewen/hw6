const articles = [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 3, text: 'test3' } ]
var nextID = 4
 
const postArticle = (req, res) => {
  const newArticle = {
      id: nextID++,
      author: 'Tom',
      text: req.body.text,
      date: new Date(),
      comments: [ ]
  }
  res.send({ articles: newArticle })
}

const getArticles = (req, res) => {
    if (!req.params.id) {
      res.send ( { articles: articles } )
      return
    }

    const ids = req.params.id.split(',')
    const articleArray = []

    ids.forEach(function(id) {
        const articleIndex = articles.find(function(article) {
          return article.id == id
         })

        articleArray.push(articleIndex)
    })

    res.send( { articles: articleArray })
}

// Update the article :id with a new text if commentId not supplied. If commentId is supplied, then update the requested comment on the article. If commentId is -1, then a new comment is posted with the text message.
const updateArticle = (req, res) => {
    const articleIndex = articles.find(function(article) {
        console.log(req.params.id )
        return article.id == req.params.id
    })

    console.log("update")

  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 3, text: 'test3' } ] })
}

module.exports = (app) => {
  app.post('/article', postArticle)
  app.get('/articles/:id*?', getArticles)
  app.put('/articles/:id', updateArticle)
}