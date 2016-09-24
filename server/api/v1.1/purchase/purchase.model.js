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

exports.addPurchase = function(datas, callback){
  var _name = datas[0];

  async.waterfall([
      function(callback){
        Module.checkExistsRows('MENU', 'NAME', _name, function(isName){
          if(!isName) callback(true, ERROR.NO_NAME_IN_MENU);
          else callback(null, isName);
        });
      },
      function(isName, callback) {
        addData(datas, function (success) {
          if(!success) callback(true, ERROR.ADD_PURCHASE);
          else callback(null, success);
        });
      }],
    function(err, results){
      if(err) callback(results);
      else callback(results);
    }
  );
};

exports.deletePurchase = function(datas, callback){
  async.waterfall([
      function(callback){
        deleteData(datas, function(success){
          if(!success) callback(true, ERROR.DELETE_PURCHASE);
          else callback(null, success);
        });
      }],
    function(err, results){
      if(err) callback(results);
      else callback(results);
    }
  );
};


function deleteData(datas, callback){
  var _id = datas[0];
  var isSuccess = false;
  console.log(_id);

  c.query('DELETE FROM PURCHASE WHERE ID = :id',
    {id : _id}, function(err, row){
      if(err) throw(err);
      if(row.info.affectedRows == 1){
        isSuccess = true;
      }
      callback(isSuccess);
    });
  c.end();
}

function addData(datas, callback){
  var _name = datas[0];
  var _quantity = datas[1];
  var _total_price = datas[2];
  var _purchase_time = datas[3];
  var _username = datas[4];
  var isSuccess = false;

  if(!_purchase_time){
    var query = 'INSERT INTO PURCHASE(NAME, QUANTITY, TOTAL_PRICE, USERNAME) VALUES(:name, :quantity, :totalPrice, :username)';
    c.query(query, { name : _name, quantity : _quantity, totalPrice : _total_price, username : _username}, function(err, row){
      if(err) throw(err);
      if(row.info.affectedRows == 1){
        isSuccess = true;
      }
      callback(isSuccess);
    });
  } else {
    var queryWithPurchaseTime = 'INSERT INTO PURCHASE(NAME, QUANTITY, PURCHASE_TIME, USERNAME) VALUES(:name, :quantity, :totalPrice, :purchase_time, :username)';
    c.query(queryWithPurchaseTime, {name : _name, quantity : _quantity, totalPrice : _total_price, purchase_time: _purchase_time, username : _username}, function(err, row){
      if(err) throw(err);
      if(row.info.affectedRows == 1){
        isSuccess = true;
      }
      callback(isSuccess);
    });
  }
  c.end();
}



