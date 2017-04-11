import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import Container, {instrument} from './components/Container'
import reducer from './reducers'

const INITIAL_STATE = {}
const enhancer = compose(applyMiddleware(thunk), instrument())
const store = createStore(reducer, INITIAL_STATE, enhancer)

const mount = () => {
    const app = <Container store={store} />
    const element = document.getElementById('app')
    render(app, element)
}

mount()

if (module.hot) {
    // if a react component changes, re-mount
    module.hot.accept('./components/Container', mount)
    // if the reducer changes, replace it
    module.hot.accept('./reducers', () => store.replaceReducer(reducer))
}
