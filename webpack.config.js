const BabiliPlugin = require('babili-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')
const {EnvironmentPlugin, HotModuleReplacementPlugin} = require('webpack')

// make sure to explicitly define NODE_ENV when using webpack
const PRODUCTION = process.env.NODE_ENV === 'production'

const BUILD_DIR = path.join(__dirname, 'build')
const CLIENT_DIR = path.join(__dirname, 'client')

function getConfig() {
    // https://github.com/webpack/webpack/issues/2478
    // sources maps and HMR don't work nicely together...
    // eval is fast and updates after HMR, but has transformed code
    // cheap-module-eval-source-map has source code, but doesn't update
    const devtool = PRODUCTION ? 'source-map' : 'eval'

    return {
        entry: getEntries(),
        output: {
            path: BUILD_DIR,
            publicPath: '/',
            filename: 'bundle.[hash].js',
        },
        devtool,
        plugins: getPlugins(),
        module: {
            rules: [
                {test: /\.js$/, include: CLIENT_DIR, use: getJsLoaders()},
                {test: /\.css$/, use: getCssLoaders()},
            ],
        },
        // suppress useless node polyfills inserted by webpack
        node: {
            process: false,
        },
    }
}

function getEntries() {
    const entries = []

    // add hot module replacement in dev
    if (!PRODUCTION) {
        entries.push('react-hot-loader/patch')
        entries.push('webpack-hot-middleware/client')
    }

    entries.push(path.join(CLIENT_DIR, 'index.css'))
    entries.push(path.join(CLIENT_DIR, 'index.js'))

    return entries
}

function getPlugins() {
    const plugins = [
        // define NODE_ENV for react and possibly others
        new EnvironmentPlugin(['NODE_ENV']),

        // render html landing page
        new HtmlPlugin({
            // minify html in prod
            minify: {
                collapseWhitespace: PRODUCTION,
            },
            // use a smarter template
            template: require('html-webpack-template'),
            inject: false,
            // configure the template
            title: 'react-redux-demo',
            appMountId: 'app',
            mobile: true,
        }),

        // extract and combine all css into single asset
        new ExtractTextPlugin({
            // disable in dev so we can leverage HMR
            disable: !PRODUCTION,
            filename: 'style.[hash].css',
            ignoreOrder: true,
        }),
    ]

    // minify js in prod
    if (PRODUCTION) {
        plugins.push(new BabiliPlugin())
    }
    // add hot module replacement in dev
    else {
        plugins.push(new HotModuleReplacementPlugin())
    }

    return plugins
}

function getJsLoaders() {
    // NOTE: these are executed in reverse order
    const loaders = []

    // add hot loading in dev
    if (!PRODUCTION) {
        loaders.push({loader: 'react-hot-loader/webpack'})
    }

    loaders.push({
        loader: 'babel-loader',
        options: {
            presets: [
                // transpile modern javascript
                ['env', {
                    // preserve ES6 modules for webpack tree shaking
                    modules: false,
                    // only apply transformations that are not native
                    // https://github.com/babel/babel-preset-env/issues/108
                    // babel-preset-env does not read browserslist automatically
                    targets: {browsers: require('./package.json').browserslist},
                    // enable this to log what plugins are being used
                    debug: false,
                }],
                // compile jsx
                'react',
            ],
        },
    })

    return loaders
}

function getCssLoaders() {
    // NOTE: these are executed in reverse order
    const loaders = []

    loaders.push({
        loader: 'css-loader',
        options: {
            // minify css in prod
            minimize: PRODUCTION,
            // use css modules
            modules: true,
            localIdentName: '[name]__[local]--[hash:base64:5]',
            // css modules need to know how many loaders ran before this
            // in this case it's one: postcss-loader
            importLoaders: 1,
        },
    })

    loaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: {
                // transpile modern css and autoprefix
                // this respects browserslist in package.json
                'postcss-cssnext': null,
            },
        },
    })

    // combine css into a single asset
    return ExtractTextPlugin.extract({
        use: loaders,
        // use this loader if plugin is disabled (i.e. in dev)
        // this loads css through inline js so it will support HMR
        fallback: 'style-loader',
    })
}

module.exports = getConfig
