import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { resource } from '../actions/resource'
import { logout } from '../actions/loginAction'
import { navigate } from './navActions'

export const Header = ({ navigate, logout }) => (

<header className="header">
    <h1 className="title" id="title">rice<small>BOOK</small></h1>
    <ul className="nav">
      <li><input type="text" className="search" placeholder="Search" /></li>
      <li><h4  type="button" onClick={ () => { navigate('MAIN_PAGE')} } >FEED </h4></li>
      <li><h4 type="button" id="profile_button" onClick={ () => { navigate('PROFILE_PAGE')} }>PROFILE </h4></li>
      <li><h4 type="button" onClick={logout }>LOGOUT</h4></li>
    </ul>
  </header>

)

export default connect(null,
    (dispatch) => {
        return {
            navigate:  (place) => navigate(place)(dispatch),
            logout: () =>  logout()(dispatch)
        }
    }
)(Header)