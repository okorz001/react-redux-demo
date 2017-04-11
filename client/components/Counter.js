import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'

import {increment} from '../actions'

const handleClick = dispatch => event => {
    event.preventDefault()
    dispatch(increment())
}

const Counter = ({dispatch, counter}) =>
    <button onClick={handleClick(dispatch)}>
        {counter}
    </button>

Counter.propTypes = {
    dispatch: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired,
}

export default connect(state => state)(Counter)
