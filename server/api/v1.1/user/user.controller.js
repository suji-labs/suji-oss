'use strict';
var db = require('./user.model.js');

var ERROR = require('../../module/error.code.js');
var Crypto = require('../../module/crypto.js');


exports.login = function(req, res) {
  var _username = req.body.username;
  var _password = Crypto.do_ciper(req.body.password);
  var datas = [_username, _password];

  db.checkLogin(datas, function(isSuccess){
    if(isSuccess){
      var response = { success : true};
    } else {
      var response = { message : 'Username or password is incorrect'};
    }
    res.send(response);
  });
};

exports.register = function(req, res) {
  var _username = req.body.username;
  var _password = Crypto.do_ciper(req.body.password);
  var _storeName = req.body.storeName;
  var _storeAddress = req.body.storeAddress;
  var datas = [_username, _password, _storeName, _storeAddress];

  db.registerUser(datas, function(isSuccess){
    switch(isSuccess){
      case true:
        res.redirect('/');
        break;
      case ERROR.DUPLICATE_USER:
        res.send('<script>alert("Error! There is already username");history.back();</script>');
        break;
      case ERROR.INSERT_USER:
        res.send('<script>alert("Error! Insert USER Error");history.back();</script>');
        break;
    }
  });
};

exports.store = function(req, res) {
  var username = req.params._username;

  db.selectUserTable(username, function(results){
    res.send(results);
  });
};
