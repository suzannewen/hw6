import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Main from './components/main/main'
import Profile from './components/profile/profile'
import Landing from './components/landing/landing'
import Header from './components/common/header'
import Footer from './components/common/footer'

export const App = ({ location }) => {
    if (location == 'MAIN_PAGE') {
        return (
                <div>
                    <Header />
                    <Main />
                    <Footer />
                </div>
        )
    }
    else if (location == 'PROFILE_PAGE') {
        return (
                <div>
                    <Header />
                    <Profile />
                    <Footer />
                </div>
        )
    }
    else if (location == 'LANDING_PAGE') {
    // else {
        return (
                <div>
                    <Landing />
                    <Footer />
                </div>
        )
    }
}

App.propTypes = {
    location: PropTypes.string.isRequired,
}

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
)(App)