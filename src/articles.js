const Article = require('../model').Article
const Profile = require('../model').Profile
const Comment = require('../model').Comment
 
const postArticle = (req, res) => {
  const newArticle = new Article({ 
      author: req.username,
      img: '',
      date: new Date(),
      text: req.body.text,
      comments: [ ]
  })
    
    newArticle.save( (err) => {
      if (err) {
        console.log(err)
      } 
    })

  res.send({ articles: newArticle })
}

const getArticles = (req, res) => {
    //if no specific id, get all of the articles
    if (!req.params.id) {
      Article
        .find( { } )
        .exec( (err, allArticles) => {
            return res.send({ articles: allArticles })
        })
    }

    //gets all articles of a username, username inputted as id param
    else if ( typeof req.params.id === "string" ) {
      Article
        .find( { username: req.params.id } )
        .exec( (err, foundArticles) => {
            return res.send({ articles: foundArticles })
        })
    }
}

// If commentId is supplied, then update the requested comment on the article
const updateArticle = (req, res) => {
  // Update the article :id with a new text if commentId not supplied.
    if (!req.body.commentId) {
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

    //If commentId is -1, then a new comment is posted with the text message.
    else if (req.body.commentId === -1 ){
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

    //if commentId is valid, edit that comment on the post
    else {
      Article
        .findOne( { _id: req.params.id } )
        .exec ( (err, foundArticle) => {
          let comments = foundArticle.comments
          //find comment in array and modify text field
          const index = comments.findIndex( (comment) => {
            if(comment._id.toString() === req.body.commentId) {
              return comment
            }
          })
          comments[index].text = req.body.text

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

}

module.exports = (app) => {
  app.post('/article', postArticle)
  app.get('/articles/:id*?', getArticles)
  app.put('/articles/:id', updateArticle)
}