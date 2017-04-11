import PropTypes from 'prop-types'
import React from 'react'
import {Provider} from 'react-redux'

import App from './App'

// no-op enhancer
export const instrument = () => x => x

const Container = ({store}) =>
    <Provider store={store}>
        <App />
    </Provider>

Container.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Container
