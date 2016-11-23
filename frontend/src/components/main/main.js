import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MainBar from './mainBar'
import NewPost from './newPost'
import Posts from './posts'


//holds the main bar as well as the discussion boxes
export const Main = ({ articles, location }) => {

let showComments = true

  return (
  <div className="off-canvas-wrapper" data-offcanvas>
    <MainBar />
    <NewPost />
    <div className="cards">
      <div className="row">
          {articles.map(({ _id, text, comments }) => (
            <Posts key={ _id } text={ text } id={ _id } showComments={ showComments } comments={ comments } />
          ))}
      </div>
    </div>
  </div>
  )
}

export default connect(
    (state) => {
        return {
            location: state.location,
            articles: state.articles
        }
    }, null
)(Main)
