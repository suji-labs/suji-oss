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

exports.selectCategoryTable = function(callback) {
  var query = 'SELECT NAME FROM CATEGORY';

  c.query(query, function(err, rows) {
    if (err) throw (err);
    callback(rows);
  });
  c.end();
};

exports.insertCategory = function(datas, callback) {
  var _name = datas[0];

  async.waterfall([
      function(callback) {
        Module.checkExistsRows('CATEGORY', 'NAME', _name, function(isDuplicate) {
          if (isDuplicate) callback(true, ERROR.DUPLICATE);
          else callback(null, isDuplicate);
        });
      },
      function(isDuplicate, callback) {
        insertData(datas, function(success) {
          if (!success) callback(true, ERROR.INSERT_CATEGORY);
          else callback(null, success);
        });
      }
    ],
    function(err, results) {
      if (err) callback(results);
      else callback(results);
    }
  );
};

function insertData(datas, callback) {
  var _name = datas[0];
  var isSuccess = false;

  c.query('INSERT INTO CATEGORY(NAME) VALUES(:name)', { name: _name }, function(err, row) {
    if (err) throw (err);
    if (row.info.affectedRows == 1) {
      isSuccess = true;
    }
    callback(isSuccess);
  });
  c.end();
}

exports.deleteCategory = function(datas, callback) {
  var _name = datas[0];

  async.waterfall([
      function(callback) {
        Module.checkExistsRows('CATEGORY', 'NAME', _name, function(isName) {
          if (!isName) callback(true, ERROR.NO_NAME_IN_CATEGORY);
          else callback(null, isName);
        });
      },
      function(isName, callback) {
        deleteData(datas, function(success) {
          if (!success) callback(true, ERROR.DELETE_CATEGORY);
          else callback(null, success);
        });
      }
    ],
    function(err, results) {
      if (err) callback(results);
      else callback(results);
    }
  );
};

function deleteData(datas, callback) {
  var _name = datas[0];
  var isSuccess = false;

  c.query('DELETE FROM CATEGORY WHERE NAME = :name', { name: _name }, function(err, row) {
    if (err) throw (err);
    if (row.info.affectedRows == 1) {
      isSuccess = true;
    }
    callback(isSuccess);
  });
  c.end();
}

