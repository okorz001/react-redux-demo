import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'

import styles from './Foo.css'

const Foo = ({foo}) =>
    <div className={styles.foo}>
        Hello {foo}
    </div>

Foo.propTypes = {
    foo: PropTypes.string.isRequired,
}

export default connect(state => state)(Foo)
