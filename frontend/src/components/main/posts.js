import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { editPost, editComment, addComment }  from '../actions/postAction'
import Comment from './comments'


// one post div generated for each article
export const Posts = ({ text, id, comments, editPost, friends, showComments, editComment, addComment, author, postImg }) => {

  let content
  let commentText

  const _editPost = (id) => {
    editPost(content.innerHTML, id)
  }

  const _addComment = (id) => {
    addComment(commentText.value, id)
  }

if (postImg.length === 0) {
  return (
  <div>
    <div className="small-9 columns">{ author } said: <div contentEditable="true" id="postText" ref={ (node) => content = node }>{ text }</div>
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
        {comments.map( ({ _id, text, author }) => (
            <Comment author={ author } key={ _id } text={ text } commentId={ _id } postId={ id } />
        ) )}
    </div>
  </div>
  )
}
else {
  return (
    <div>
    <div className="small-9 columns">{ author } said: <div contentEditable="true" id="postText" ref={ (node) => content = node }>{ text }</div>
      <img className="thumbnail" src={postImg}/>
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
        {comments.map( ({ _id, text, author }) => (
            <Comment author={ author } key={ _id } text={ text } commentId={ _id } postId={ id } />
        ) )}
    </div>
  </div>
  )
}

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
          addComment: (text, id) => addComment(text, id)(dispatch)
        }
    }
)(Posts)