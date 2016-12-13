import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { editComment }  from '../actions/postAction'

// one post div generated for each article
export const Comment = ({ text, commentId, postId, editComment, author }) => {
  let content

  const _editComment = (postId, commentId) => {
    editComment(content.innerHTML, postId, commentId)
  }

  return (
  <div>
    <div className="small-9 columns" id="comment">{ author } commented: <div contentEditable="true" id="postText" ref={ (node) => content = node }>{ text }</div>
      <div>
        <input type="button" value="Edit" id="leftComment" onClick={ () => { _editComment(postId, commentId) } }/> 
      </div>
    </div>
  </div>
  )
}

export default connect(null,
  (dispatch) => {
    return {
      editComment: (text, postId, commentId) => editComment(text, postId, commentId)(dispatch)
    }
  })(Comment)