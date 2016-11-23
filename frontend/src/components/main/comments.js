import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { editComment }  from '../actions/postAction'

// one post div generated for each article
export const Comment = ({ text, id, editComment, author }) => {
  let content

  const _editComment = (id) => {
    editComment(content.innerHTML, id)
  }

  return (
  <div>
    <div className="small-9 columns" id="comment"><div contentEditable="true" id="postText" ref={ (node) => content = node }>{ text }</div>
      <div>
        <input type="button" value="Edit" id="leftComment" onClick={ () => { _editComment(id) } }/> 
      </div>
    </div>
  </div>
  )
}

// export const Comment = ({ }) => (
//       <div>
//         <input type="button" value="HELLLLLLO" id="left" /> 
//       </div>
// )

export default connect(null,
  (dispatch) => {
    return {
      editComment: (content, id) => editComment(content, id)(dispatch)
    }
  })(Comment)