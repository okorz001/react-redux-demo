const {Router} = require('express')

const router = Router()

router.get('/foo', (req, res) => res.send('foo'))

module.exports = router
