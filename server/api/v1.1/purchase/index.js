'use strict';

var express = require('express');
var controller = require('./purchase.controller.js');
var router = express.Router();

router.get('/:_username', controller.index);
router.post('/add/:_username', controller.add);
router.post('/delete', controller.delete);

module.exports = router;
