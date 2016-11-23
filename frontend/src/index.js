require('./styles.css')

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
// import createLogger from 'redux-logger'
// import { createStore, applyMiddleware } from 'redux'
import { createStore } from 'redux'

import Reducer from './reducer'
import App from './app'

// const logger = createLogger()
// const store = createStore(Reducer, applyMiddleware(logger))
const store = createStore(Reducer)

render(
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.getElementById('app')
)
