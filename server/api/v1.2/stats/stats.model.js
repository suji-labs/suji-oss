'use strict';

var Client = require('mariasql');
var async = require('async');
var ERROR = require('../../module/error.code.js');
var Module = require('../../module/query.js');

var c = new Client({
  host: 'localhost',
  user: 'root',
  password: '',
  db: 'suji_dev'
});

exports.dailyStats = function(callback) {
  var query = 'SELECT DATE_FORMAT(PURCHASE_TIME, "%Y-%m-%d") as DATE, sum(TOTAL_PRICE) as SUM FROM PURCHASE GROUP BY DATE_FORMAT(PURCHASE_TIME, "%Y-%m-%d") ORDER BY DATE_FORMAT(PURCHASE_TIME, "%Y-%m-%d") desc limit 7';

  c.query(query, function(err, rows) {
    if (err) throw(err);
    callback(rows);
  });
  c.end();
};
