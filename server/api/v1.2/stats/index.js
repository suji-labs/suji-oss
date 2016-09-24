'use strict';

var express = require('express');
var controller = require('./stats.controller.js');
var router = express.Router();
// i'm comment
router.get('/daily', controller.daily);

module.exports = router;
