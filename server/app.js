const express = require('express')

const PORT = process.env.PORT || 8080

const app = express()

// do not add dev hooks in production
console.log(`NODE_ENV = ${process.env.NODE_ENV}`)
if (process.env.NODE_ENV !== 'production') require('./dev')(app)

app.use(express.static('./build', {
    // cache for a day (this is in ms)
    maxAge: 24 * 60 * 60 * 1000,
}))

// closure allows re-require in dev
app.use((req, res, next) => require('./routes')(req, res, next))

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
