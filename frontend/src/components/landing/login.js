import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { resource } from '../actions/resource'
import { login } from '../actions/loginAction'

export const Login = ({ authLogin, fbAuthLogin }) => {
  let username, password

  const _authLogin = () => {
    if (username && username.value && password && password.value) {
      authLogin (username.value, password.value)
    }
  }

  const fbAuth = () => {
    window.location = 'http://localhost:3000/auth/login'
  }

  return (
    <div className="small-12 large-6 columns">
      <div className="boxes">
        <div className="info" id="login">
        <h3>Log in</h3>
          <p>Account Name <input type="text" id="login_username" ref={ (node) => username = node }/></p>
          <p>Password <input type="password" id="login_password" ref={(node) => password = node} /></p>
          <input type="button" id="login_button" value="Log In" onClick={ _authLogin } />
          <input type="button" value="Clear" />
        </div>
      </div>
      <img src='http://return.me/images/fbicon.png' onClick={ fbAuth }/>
    </div>
)}

Login.propTypes = {
    authLogin: PropTypes.func.isRequired
}

export default connect(null,
    (dispatch) => {
        return {
            authLogin: (username, password) =>  login(username, password)(dispatch)
        }
    }
)(Login)