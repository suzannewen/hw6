import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { editPost, editComment, addComment }  from '../actions/postAction'
import Comment from './comments'


// one post div generated for each article
export const Posts = ({ text, id, comments, editPost, friends, showComments, editComment, addComment }) => {

  let content
  let commentText

  const _editPost = (id) => {
    editPost(content.innerHTML, id)
  }

  const _addComment = (id) => {
    addComment(commentText.value, id)
  }

  return (
  <div>
    <div className="small-9 columns"><div contentEditable="true" id="postText" ref={ (node) => content = node }>{ text }</div>
      <div>
        <input type="button" value="Edit" id="left" onClick={ () => {_editPost(id)} }/> 
        <input type="button" value="Show Comments" id="middle" />
        <input type="button" value="Submit Comment" id="right" onClick = { () => {_addComment(id)} }/>
      </div>
      <div>
        <input type="text" placeholder="Leave a comment here" ref={ (node) => commentText = node }/>
      </div>
    </div>
    <div className="comments">
        {comments.map( ({ _id, text }) => (
            <Comment key={ _id } text={ text } id={ _id } editComment={ editComment } />
        ) )}
    </div>
  </div>
  )
}

export default connect(
        (state) => {
        return {
            username: state.username,
            headline: state.headline,
            friends: state.friends,
            avatar: state.avatar
        }
    }, 
    (dispatch) => {
        return {
          editPost: (content, id) => editPost(content, id)(dispatch),
          editComment: (content, id) => editComment(content, id)(dispatch),
          addComment: (text, id) => addComment(text, id)(dispatch)
        }
    }
)(Posts)