import PropTypes from 'prop-types'
import React from 'react'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {createDevTools} from 'redux-devtools'
import DockMonitor from 'redux-devtools-dock-monitor'
import LogMonitor from 'redux-devtools-log-monitor'
import SliderMonitor from 'redux-slider-monitor'

import App from './App'

// h for hide
const HIDE_KEY = 'ctrl-h'
// n for next
const MONITOR_KEY = 'ctrl-n'
// m for move
const POSITION_KEY = 'ctrl-m'

const THEME = 'chalk'

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey={HIDE_KEY}
                 changeMonitorKey={MONITOR_KEY}
                 changePositionKey={POSITION_KEY}
                 defaultPosition='bottom'
                 defaultIsVisible={false}>
        <LogMonitor theme={THEME}
                    markStateDiff={true} />
        <SliderMonitor theme={THEME} />
    </DockMonitor>
)

export const instrument = () => DevTools.instrument()

// The div is required because the wrapper components require exactly one child.
// However, this is problematic from a layout perspective since it adds an extra
// parent element around our app. The workaround is force the div to expand to
// the exact dimensions of our parent element (i.e. React mount point).
const Container = ({store}) =>
    <AppContainer>
        <Provider store={store}>
            <div style={{width: '100%', height: '100%'}}>
                <App />
                <DevTools />
            </div>
        </Provider>
    </AppContainer>

Container.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Container
