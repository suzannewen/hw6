const mongoose = require('mongoose')
require('./db.js')

const commentSchema = new mongoose.Schema({
      commentId: Number,
      author: String,
      text: String,
      date: Date,
})

const postSchema = new mongoose.Schema({
	id: Number,
      author: String,
      img: String,
      date: Date,
      text: String,
	comments: [ commentSchema ]
})

var userSchema = new mongoose.Schema({
      username: String,
      salt: String,
      hash: String
})

var profileSchema = new mongoose.Schema({
    username: String,
    status: String,
    following: [ String ],
    email: String,
    zipcode: String,
    picture: String 
})

exports.Article = mongoose.model('post', postSchema)
exports.User = mongoose.model('user', userSchema)
exports.Profile = mongoose.model('profile', profileSchema)

