import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Register from './register'
import Login from './login'
import { initialVisit } from '../actions/loginAction'
import { getHeadline } from '../actions/dataAction'

export const Landing = ({ initialVisit, getHeadline }) => {

// initialVisit()
getHeadline()

return (
  <div>
    <header className="header">
      <h1 className="title">welcome to rice<small>BOOK</small></h1>
    </header>

    <div className="row">
      <Register />
      <Login />
    </div>
  </div>
)
}

export default connect(
    (state) => {
        return {
            location: state.location} }, 
    (dispatch) => {
        return {
            initialVisit: () =>  initialVisit()(dispatch),
            getHeadline: () =>  getHeadline()(dispatch),
        }
    }
)(Landing)