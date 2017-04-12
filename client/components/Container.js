/* global require */
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./Container.prod')
}
else {
    module.exports = require('./Container.dev')
}
