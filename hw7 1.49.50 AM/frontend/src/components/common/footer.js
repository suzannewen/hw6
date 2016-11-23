import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

//consistent throughout the app
export const Footer = () => (

  <footer className="footer">
    <div className="row">
      <div className="small-12 columns">Suzanne Wen © 2016</div>
    </div>
  </footer>

)

export default connect(
    (state) => {
        return {
            location: state.location
        }
    },
    (dispatch) => {
        return {
            placeholder:  () => dispatch({ type: "NAVIGATION"})
        }
    }
)(Footer)