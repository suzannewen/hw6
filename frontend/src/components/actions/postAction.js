import { resource, resourceImg } from './resource'
import { getArticles } from '../actions/dataAction'

const newPost = ( message ) => (dispatch) =>
  resource('POST', 'article', { text: message })
  .then( r=> console.log(r) )
  // .then ( getArticles()(dispatch) )

const newPostImg = ( fd ) => (dispatch) =>
  resourceImg('POST', 'article', fd)
  .then( r=> console.log(r) )

const editPost = ( message, id ) => (dispatch) => {
  resource('PUT', 'articles/' + id, { text: message })
  .then ( getArticles()(dispatch) )
}

const addComment = ( message, postId ) => (dispatch) => {
  resource('PUT', 'articles/' + postId, { text: message, commentId: -1 })
  .then ( r=> {
    dispatch( { type: 'ARTICLES', articles: r.articles } )
  })
}

const editComment = ( message, postId, commentId ) => (dispatch) => {
  resource('PUT', 'articles/' + postId, { text: message, commentId: commentId })
  .then ( r=> {
    dispatch( { type: 'ARTICLES', articles: r.articles } )
  })
}

export { newPost, newPostImg, editPost, addComment, editComment }