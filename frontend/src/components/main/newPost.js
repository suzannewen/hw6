import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { newPost, newPostImg } from '../actions/postAction'

export const NewPost = ({ newPostImg, newPost }) => {
let postText
let postImg

const _newPost = () => {
   if (postText && postText.value) {
    const fd = new FormData()
    const message = postText.value
    fd.append('text', message)

    if (postImg.files.length != 0) {
      const file = postImg.files[0]
      fd.append('image', file)
      newPostImg(fd)
    }
    else {
      newPost(message)
    }
  }
}

// const uploadAvatar = (e) => {
//     const file = e.target.files[0]
//     var fd = new FormData()
//     fd.append('image', file)

//     updateAvatar(fd)
// }

return (
 <div className="row">
    <div className="small-9 columns">
      <div className="post">
        <input type="text" id="article_text" placeholder="What would you like to post?" ref={ (node) => postText = node }/><br />
        <input type="file" accept="image/*" ref={ (node) => postImg = node }/><input type="button" value="Post" id="right" onClick={_newPost}/>
      </div>
    </div>
  </div>
)}

export default connect(null, 
    (dispatch) => {
        return {
            newPost: (fd) =>  newPost(fd)(dispatch),
            newPostImg: (message) =>  newPost(message)(dispatch)
        }
    }
)(NewPost)

 