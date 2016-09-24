'use strict';

var express = require('express');
var controller = require('./category.controller.js');
var router = express.Router();

router.get('/', controller.index);
router.post('/insert', controller.insert);

module.exports = router;
