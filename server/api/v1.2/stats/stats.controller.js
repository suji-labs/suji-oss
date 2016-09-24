'use strict';

var db = require('./stats.model.js');
var ERROR = require('../../module/error.code.js');

exports.daily = function(req, res) {
  db.dailyStats(function(results) {
      res.status(200).send({
        status: 'success',
        results: results
      });
  });
};
