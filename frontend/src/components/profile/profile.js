import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Info from './info'
import UpdateInfo from './updateInfo'

//contains Info and UpdateInfo containers
export const Profile = ({  }) => (
  <div className="row">
     <Info />
     <UpdateInfo />
  </div>
)

export default connect(
    (state) => {
        return {
            location: state.location
        }
    }
)(Profile)