'use strict';

var express = require('express');
var controller = require('./employee.controller.js');
var router = express.Router();
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({
    uploadDir: __dirname + '/../../../resources/profile',
});

router.get('/', controller.index);
router.post('/insert', controller.insert);
router.post('/delete', controller.delete);
router.post('/update', controller.update);
router.post('/profile/:_id', multipartyMiddleware, controller.uploadProfile);
router.get('/profile/:_id', controller.showProfile);

module.exports = router;
