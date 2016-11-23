import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { login, register } from '../actions/loginAction' 

export const Register = ({ authRegister }) => {
  let username, email, dob, zipcode, password

  const _authRegister = () => {
      authRegister (username.value, email.value, dob.value, zipcode.value, password.value)
  }

  return (
    <div className="small-12 large-6 columns">
        <div className="boxes">
        <div className="info">
        <h3>Register for an account</h3>
          <div className="form" id="login">
            <p>Account Name <input type="text" name="account" required="" pattern="^[A-Za-z][A-Za-z0-9]*" placeholder="alphanumerical, cannot start with number" ref={ (node) => username = node }/></p>
            <p>Display Name <input type="text" name="display" placeholder="optional" /></p>
            <p>Email Address <input type="email" name="email" required="" pattern="[0-9a-zA-Z\-]{1,}.?[0-9a-zA-Z\-]*@[0-9a-zA-Z\-]{1,}.[a-zA-Z\-]{1,}" placeholder="must be valid email" ref={ (node) => email = node }/></p>
            <p>Phone Number <input type="tel" name="phone" required="" pattern="^\d{3}-\d{3}-\d{4}" placeholder="### - ### - ####" /></p>
            <p>Date of Birth (must be at least 18 years of age)<input type="date" id="birthdate" name="birth" required="" ref={ (node) => dob = node }/></p>
            <p>Zipcode <input type="tel" name="zipcode" required="" pattern="[0-9]{5}" placeholder="5 digits" ref={ (node) => zipcode = node }/></p>
            <p>Password <input type="password" id="password" name="password" required="" pattern=".{6,}" maxLength="20" placeholder="min 6 char, max 20 char" ref={ (node) => password = node }/></p>
            <p>Password Confirmation <input type="password" id="confirmation" name="confirmation" required="" placeholder="must match above password" /> <i></i></p>
            <input type="hidden" id="timestamp" name="time" />
            <input type="submit" value="Make Account" onClick={_authRegister} />
            <input type="reset" value="Clear" />
          </div>
        </div>
        </div>
    </div>
)}

Register.propTypes = {
    authRegister: PropTypes.func.isRequired
}

export default connect(null, (dispatch) => {
        return {
            authRegister: (username, email, dob, zipcode, password) =>  register(username, email, dob, zipcode, password)(dispatch)
        }
    }
)(Register);