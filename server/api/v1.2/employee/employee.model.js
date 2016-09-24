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

exports.selectEmployeeTable = function(callback) {
  var query = 'SELECT * FROM EMPLOYEE';

  c.query(query, function(err, rows) {
    if (err) throw (err);
    callback(rows);
  });
  c.end();
};

exports.insertEmployee = function(datas, callback) {
    console.log(datas);
  var _id = datas[0];
  var _employer = datas[3];

  async.waterfall([
      function(callback) {
        Module.checkExistsRows('USER', 'USERNAME', _employer, function(isExist) {
          if (!isExist) callback(true, ERROR.NO_USERNAME_IN_USER);
          else callback(null, isExist);
        });
      },
      function(isExist, callback) {
        Module.checkExistsRows('EMPLOYEE', 'ID', _id, function(isDuplicate) {
          if (isDuplicate) callback(true, ERROR.DUPLICATE);
          else callback(null, isDuplicate);
        });
      },
      function(isDuplicate, callback) {
        insertData(datas, function(success) {
          if (!success) callback(true, ERROR.INSERT_EMPLOYEE);
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
  var _id = datas[0];
  var _name = datas[1];
  var _title = datas[2];
  var _employer = datas[3];
  var isSuccess = false;

  c.query('INSERT INTO EMPLOYEE(ID, NAME, TITLE, EMPLOYER) VALUES(:id, :name, :title, :employer)',
  { id: _id, name : _name, title : _title, employer : _employer }, function(err, row) {
    if (err) throw (err);
    if (row.info.affectedRows == 1) {
      isSuccess = true;
    }
    callback(isSuccess);
  });
  c.end();
}

exports.deleteEmployee = function(datas, callback) {
  var _id = datas[0];

  async.waterfall([
      function(callback) {
        Module.checkExistsRows('EMPLOYEE', 'ID', _id, function(isID) {
          if (!isID) callback(true, ERROR.NO_ID_IN_EMPLOYEE);
          else callback(null, isID);
        });
      },
      function(isID, callback) {
        deleteData(datas, function(success) {
          if (!success) callback(true, ERROR.DELETE_EMPLOYEE);
          else callback(null, success);
        });
      }
    ],
    function(err, results) {
      console.log(results);
      if (err) callback(results);
      else callback(results);
    }
  );
};

function deleteData(datas, callback) {
  var _id = datas[0];
  var isSuccess = false;

  c.query('DELETE FROM EMPLOYEE WHERE ID = :id', { id: _id }, function(err, row) {
    if (err) throw (err);
    if (row.info.affectedRows == 1) {
      isSuccess = true;
    }
    callback(isSuccess);
  });
  c.end();
}

exports.updateEmployee = function(datas, callback) {
  var _id = datas[0];
  var _employer = datas[3];

  async.waterfall([
      function(callback) {
        Module.checkExistsRows('USER', 'USERNAME', _employer, function(isExist) {
          if (!isExist) callback(true, ERROR.NO_USERNAME_IN_USER);
          else callback(null, isExist);
        });
      },
      function(isExist, callback) {
        Module.checkExistsRows('EMPLOYEE', 'ID', _id, function(isExist) {
          if (!isExist) callback(true, ERROR.NO_ID_IN_EMPLOYEE);
          else callback(null, isExist);
        });
      },
      function(isExist, callback) {
        updateData(datas, function(success) {
          if (!success) callback(true, ERROR.UPDATE_EMPLOYEE);
          else callback(null, success);
        });
      }
    ],
    function(err, results) {
      console.log(results);
      if (err) callback(results);
      else callback(results);
    }
  );
};

function updateData(datas, callback) {
  var _id = datas[0];
  var _name = datas[1];
  var _title = datas[2];
  var _employer = datas[3];
  var isSuccess = false;

  c.query('UPDATE EMPLOYEE SET NAME= :name, TITLE= :title, EMPLOYER= :employer WHERE ID= :id',
  {  name : _name, title : _title, employer : _employer, id: _id}, function(err, row) {
    if (err) throw (err);
    else isSuccess = true;
    callback(isSuccess);
  });
  c.end();
}
