const chokidar = require('chokidar')
const webpack = require('webpack')

// invalidate require cache if files change. this allows reloading if require
// is called again, but will not do anything if the module is saved to a var.
function reloadRoutes() {
    const watcher = chokidar.watch(__dirname)
    watcher.on('ready', () => {
        watcher.on('all', () => {
            console.log(`Clearing require cache`)
            Object.keys(require.cache)
                .filter(module => module.startsWith(__dirname))
                .forEach(module => delete require.cache[module])
        })
    })
}

// config webpack middleware to push new bundles to the browser. this allows
// the client to update without full reload of page, preserving state.
function hotModuleReplacement(app) {
    const config = require('../webpack.config.js')()
    const compiler = webpack(config)
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        stats: {colors: true},
    }))
    app.use(require('webpack-hot-middleware')(compiler))
}

module.exports = app => {
    reloadRoutes()
    hotModuleReplacement(app)
}
