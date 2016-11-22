const articles = [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 3, text: 'test3' } ]
var nextID = 4

const Article = require('../model').Article
const Profile = require('../model').Profile
 
const postArticle = (req, res) => {
  const newArticle = new Article({ 
      // id: nextID++,
      author: req.username,
      img: '',
      date: new Date(),
      text: req.body.text,
      comments: [ ]
  })
    
    newArticle.save( (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('saved user')
      }
    })

  // const newArticle = {
  //     id: nextID++,
  //     author: 'Tom',
  //     text: req.body.text,
  //     date: new Date(),
  //     comments: [ ]
  // }
  res.send({ articles: newArticle })
}

const getArticles = (req, res) => {
    if (!req.params.id) { //gets all articles in DB
      Article
        .find( { } )
        .exec( (err, allArticles) => {
            return res.send({ articles: allArticles })
        })
    }
    else if ( typeof req.params.id === "string" ) { //gets all articles of a username, username inputted as id param
      Article
        .find( { username: req.params.id } )
        .exec( (err, foundArticles) => {
          console.log(foundArticles)
            return res.send({ articles: foundArticles })
        })
    }
}

// If commentId is supplied, then update the requested comment on the article. If commentId is -1, then a new comment is posted with the text message.
const updateArticle = (req, res) => {
    if (!res.body.commentId) { // Update the article :id with a new text if commentId not supplied.
      Article
        .findOneAndUpdate( { _id: res.params.id }, { text: res.body.text } )
        .exec ( (err, updatedArticle) => {
          res.send( { articles: updatedArticle })
        } )
    }
    else {

    }
  //   const articleIndex = articles.find(function(article) {
  //       console.log(req.params.id )
  //       return article.id == req.params.id
  //   })

  //   console.log("update")

  // res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 3, text: 'test3' } ] })
}

module.exports = (app) => {
  app.post('/article', postArticle)
  app.get('/articles/:id*?', getArticles)
  app.put('/articles/:id', updateArticle)
}