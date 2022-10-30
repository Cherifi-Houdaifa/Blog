var express = require('express');
var router = express.Router();

const authRouter = require('./auth');
const dataRouter = require('./data');

router.use('/auth', authRouter);

router.use('/', dataRouter);

module.exports = router;
