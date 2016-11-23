import { resource } from './resource'
import { getArticles } from '../actions/dataAction'

const newPost = ( message ) => (dispatch) =>
  resource('POST', 'article', { text: message })
  .then ( getArticles()(dispatch) )

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

export { newPost, editPost, addComment, editComment }