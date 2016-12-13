import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateAvatar } from '../actions/updateAction' 

//displays info for users to view
export const Info = ({ username, headline, avatar, email, zipcode, updateAvatar }) =>  {

const uploadAvatar = (e) => {
    const file = e.target.files[0]
    var fd = new FormData()
    fd.append('image', file)

    updateAvatar(fd)
}

return (
    <div className="small-12 large-6 columns">
      <div className="boxes">
        <div className="profilePic"><img src={avatar}/></div> 
          <input type="file" accept="image/*" onChange={(e) => uploadAvatar(e) }/>
        <div className="info">
          <h4 id="nameCurrent">{ username }</h4>
          <i>{ headline }</i>
          <p>
            <i className="fi-mail"></i> <nobr id="emailCurrent">{ email }</nobr><br />
             <i className="fi-home"></i> <nobr id="zipCurrent">{ zipcode }</nobr><br />
            </p>
        </div>
      </div>
    </div>
)}

export default connect(
    (state) => {
        return {
            username: state.username,
            headline: state.headline,
            avatar: state.avatar,
            email: state.email,
            zipcode: state.zipcode,
        }
    }, 
    (dispatch) => {
        return {
            updateAvatar: (fd) => updateAvatar(fd)(dispatch) } }
)(Info)