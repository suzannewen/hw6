import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { newPost } from '../actions/postAction'

export const NewPost = ({ newPost }) => {
let postText

const _newPost = () => {
    if (postText && postText.value) {
      newPost (postText.value)
    }
}

return (
 <div className="row">
    <div className="small-9 columns">
      <div className="post">
        <input type="text" id="article_text" placeholder="What would you like to post?" ref={ (node) => postText = node }/><br />
        <input type="file" value="UPLOAD A PICTURE" id="left"/><input type="button" value="Post" id="right" onClick={_newPost}/>
      </div>
    </div>
  </div>
)}

export default connect(null, 
    (dispatch) => {
        return {
            newPost: (message) =>  newPost(message)(dispatch)
        }
    }
)(NewPost)

 