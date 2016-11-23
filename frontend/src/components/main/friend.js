import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { deleteFriend } from '../actions/mainAction'

// generated depending on how many friends you have
export const Friend = ({ name, headline, deleteFriend }) => (
      <div>
        <img className="thumbnail"/>
        <h6><i className="fi-x" onClick={() => { deleteFriend(name) } }></i> { name }</h6>
        <p><i>{ headline }</i></p><br />
      </div>
)
