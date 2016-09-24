'use strict';

var Client = require('mariasql');
var async = require('async');

var c = new Client({
  host: 'localhost',
  user: 'root',
  password: '',
  db: 'suji_dev'
});
exports.c = c;

exports.checkExistsRows = function(_table, _column, _toCheck, callback){
  var queryString = 'SELECT EXISTS(SELECT 1 FROM ' + _table + ' WHERE ' + _column + ' = :toCheck) AS checkResult';
  var isDuplicate = false;

  c.query(queryString, { toCheck :_toCheck }, function(err, row) {
    if (err) throw err;
    if (row[0].checkResult == 1) //0 : not duplicate, 1 : duplicate
      isDuplicate = true;
    callback(isDuplicate);
  });
  c.end();
};

exports.selectTable = function(_table, callback){
  var queryString = 'SELECT * FROM ' + _table ;
  c.query(queryString, function(err, rows){
    if (err)
      throw err;
    callback(rows);
  });
  c.end();
};

exports.selectTableOrderBy = function(_table, _column, _order, callback){
  if(_order == 'ASC'){
    var queryString = 'SELECT * FROM ' + _table + ' ORDER BY ' + _column + ' ASC' ;
  } else if(_order == 'DESC') {
    var queryString = 'SELECT * FROM ' + _table + ' ORDER BY ' + _column + ' DESC' ;
  } else {
    var queryString = 'SELECT * FROM ' + _table ;
  }
  c.query(queryString, function(err, rows){
    if (err)
      throw err;
    callback(rows);
  });
  c.end();
};


exports.checkIsNull = function(_column, _table, _where, _toCheck, callback){
  var queryString = 'SELECT IFNULL('+ _column + ', true) AS isNull FROM ' + _table + ' WHERE ' + _where + ' = :toCheck';
  var isNull = false;

  c.query(queryString, { toCheck :_toCheck }, function(err, row) {
    if (err) throw err;
    console.log(row);
    if (row[0].isNull == 1) //0 : not null, 1 : null
      isNull = true;
    callback(isNull);
  });
  c.end();
};

exports.selectTableWhere = function(_table, _where_column, _toCheck, _column, _order, callback){
  if(_order === 'ASC'){
    var queryString = 'SELECT * FROM ' + _table + ' WHERE ' + _where_column + ' = :toCheck' + ' ORDER BY ' + _column + ' ASC';
  } else if(_order === 'DESC') {
    var queryString = 'SELECT * FROM ' + _table + ' WHERE ' + _where_column + ' = :toCheck' + ' ORDER BY ' + _column + ' DESC';
  } else {
    var queryString = 'SELECT * FROM ' + _table + 'WHERE ' + _where_column + ' = :toCheck';
  }
  console.log(queryString);
  c.query(queryString, {toCheck : _toCheck }, function(err, rows){
    if (err)
      throw err;
      console.log(rows);
    callback(rows);
  });
  c.end();
};
