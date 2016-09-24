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

exports.selectMenuByCategory = function(callback) {
  var output = [];

  c.query('SELECT NAME FROM CATEGORY', function(err, rows) {
    if (err) throw (err);
    async.each(rows,
      function(row, callbackEach) {
        c.query('SELECT * FROM MENU WHERE CATEGORY_NAME=:category ORDER BY NAME ASC', { category: row.NAME }, function(err, results) {
          if (err) throw (err);
          row['MENU'] = results;
          output.push(row);
          callbackEach();
        });
      },
      function(err) {
        if (err) throw (err);
        c.end();
        callback(output);
      }
    );
  });
};

exports.selectMenuTable = function(_category, callback) {
  c.query('SELECT * FROM MENU WHERE CATEGORY_NAME=:category', { category: _category }, function(err, rows) {
    if (err) throw (err);
    callback(rows);
  });
  c.end();
};

exports.insertMenu = function(datas, callback) {
  var _name = datas[0];
  var _category_name = datas[5];

  async.waterfall([
      function(callback) {
        Module.checkExistsRows('CATEGORY', 'NAME', _category_name, function(isName) {
          if (!isName) callback(true, ERROR.NO_NAME_IN_CATEGORY);
          else callback(null, isName);
        });
      },
      function(isName, callback) {
        checkMenu('MENU', 'NAME', _name, 'CATEGORY_NAME', _category_name, function(isDuplicate) {
          if (isDuplicate) callback(true, ERROR.DUPLICATE);
          else callback(null, isDuplicate);
        });
      },
      function(isDuplicate, callback) {
        insertData(datas, function(success) {
          if (!success) callback(true, ERROR.INSERT_MENU);
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

function checkMenu(_table, _column, _toCheck, _column2, _toCheck2, callback) {
  var queryString = 'SELECT EXISTS(SELECT 1 FROM ' + _table + ' WHERE ' + _column + ' = :toCheck AND ' + _column2 + ' = :toCheck2) AS checkResult';
  var isDuplicate = false;

  c.query(queryString, { toCheck: _toCheck, toCheck2: _toCheck2 }, function(err, row) {
    if (err) throw err;
    if (row[0].checkResult == 1) //0 : not duplicate, 1 : duplicate
      isDuplicate = true;
    callback(isDuplicate);
  });
  c.end();
}

exports.deleteMenu = function(datas, callback) {
  var _name = datas[0];
  console.log(datas);

  async.waterfall([
      function(callback) {
        Module.checkExistsRows('MENU', 'NAME', _name, function(isName) {
          if (!isName) callback(true, ERROR.NO_NAME_IN_MENU);
          else callback(null, isName);
        });
      },
      function(isName, callback) {
        deleteData(datas, function(success) {
          if (!success) callback(true, ERROR.DELETE_MENU);
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

  c.query('DELETE FROM MENU WHERE NAME = :name', { name: _name }, function(err, row) {
    if (err) throw (err);
    if (row.info.affectedRows == 1) {
      isSuccess = true;
    }
    callback(isSuccess);
  });
  c.end();
}


function insertData(datas, callback) {
  var _name = datas[0];
  var _price = datas[1];
  var _prime_cost = datas[2];
  var _tax_mode = datas[3];
  var _barcode = datas[4];
  var _category_name = datas[5];
  var isSuccess = false;

  c.query('INSERT INTO MENU(NAME, PRICE, PRIME_COST, TAX_MODE, BARCODE, CATEGORY_NAME) VALUES(:name, :price, :prime_cost, :tax_mode, :barcode, :category_name)',
  { name: _name, price: _price, prime_cost: _prime_cost, tax_mode: _tax_mode, barcode: _barcode, category_name: _category_name }, function(err, row) {
    if (err) throw (err);
    if (row.info.affectedRows == 1) {
      isSuccess = true;
    }
    callback(isSuccess);
  });
  c.end();
}



