const articles = [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 3, text: 'test3' } ]
var nextID = 4

const Article = require('../model').Article
const Profile = require('../model').Profile
const Comment = require('../model').Comment
 
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
        console.log('saved article')
      }
    })

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

// If commentId is supplied, then update the requested comment on the article
const updateArticle = (req, res) => {
    if (!req.body.commentId) { // Update the article :id with a new text if commentId not supplied.
      Article
        .findOneAndUpdate( { _id: req.params.id }, { text: req.body.text } )
        .exec ( (err, updatedArticle) => {
          // res.send( { articles: updatedArticle })
            Article
              .find( {} )
              .exec ((err, allArticles) => {
                return res.send( { articles: allArticles })
              })
        } )
    }
    else if (req.body.commentId === -1 ){ //If commentId is -1, then a new comment is posted with the text message.
      Article
        .findOne( { _id: req.params.id } )
        .exec ( (err, foundArticle) => {
          let comments = foundArticle.comments
          const newComment = new Comment({ 
            author: req.username,
            text: req.body.text,
            date: new Date()
          })
          comments = comments.concat( [ newComment ] )
          console.log(comments)
          Article
           .findOneAndUpdate( { _id: req.params.id }, { comments: comments } )
           .exec ((err, updatedArticle) => {
             Article
              .find( {} )
              .exec ((err, allArticles) => {
                return res.send( { articles: allArticles })
              })
           })
        } )
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