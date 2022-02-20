const router = require('express').Router();

router.use('/users', require('./users'));

router.use('/', require('./routes'));

module.exports = router;