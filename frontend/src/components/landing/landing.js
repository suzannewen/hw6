import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Register from './register'
import Login from './login'

export const Landing = ({  }) => (
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

export default connect(
    (state) => {
        return {
            location: state.location
        }
    }, null
)(Landing)