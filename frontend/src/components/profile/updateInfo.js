import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateZipcode, updateEmail, updatePW } from '../actions/updateAction' 

//allows users to update their information (functionality not added yet)
export const UpdateInfo = ({ updateEmail, updateZipcode, updatePW }) => {
  let email, zipcode, password

  const _update = () => {
    if(email && email.value) {
      updateEmail(email.value)
    }
    if (zipcode && zipcode.value) {
      updateZipcode(zipcode.value)
    }
    if (password && password.value) {
      updatePW(password.value)
    }
  }

  return (
  <div className="small-12 large-6 columns">
        <div className="boxes">
          <div className="info">
            <h3>Update Information</h3>
            <p>
                <input type="text" id="email" placeholder="email" pattern="[0-9a-zA-Z\-]{1,}.?[0-9a-zA-Z\-]*@[0-9a-zA-Z\-]{1,}.[a-zA-Z\-]{1,}" id="email" ref={ (node) => email = node }/><br />
                <input type="text" id="zipcode" placeholder="zip code" pattern="[0-9]{5}" id="phone" ref={ (node) => zipcode = node }/><br />
                <input type="text" id="password" placeholder="password" id="pw" ref={ (node) => password = node }/><br />
              </p>
                <input type="button" value="Update" id="update" onClick={_update}/>
          </div>
        </div>
      </div>
)}

export default connect( null, (dispatch) => {
        return {
            updateEmail: (email) => updateEmail(email)(dispatch),
            updateZipcode: (zipcode) => updateZipcode(zipcode)(dispatch),
            updatePW: (password) => updatePW(password)(dispatch)
        }
})(UpdateInfo)