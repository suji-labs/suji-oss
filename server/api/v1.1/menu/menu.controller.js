'use strict';

var db = require('./menu.model.js');
var ERROR = require('../../module/error.code.js');
var Module = require('../../module/query.js');

exports.showByCategory = function(req, res) {
  db.selectMenuByCategory(function(results) {
    res.send(results);
  });
};

exports.index = function(req, res) {
  var _category = req.params.category;

  db.selectMenuTable(_category, function(results) {
    res.send(results);
  });
};

exports.show = function(req, res) {
  Module.selectTableOrderBy('MENU', 'CATEGORY_NAME', 'ASC', function(results) {
    res.send(results);
  });
};

exports.insert = function(req, res) {
  var _name = req.body.NAME;
  var _price = req.body.PRICE;
  var _prime_cost = req.body.PRIME_COST;
  var _tax_mode = 1;
  if (req.body.TAX_MODE == 'false') _tax_mode = 0;

  var _barcode = req.body.BARCODE;
  var _category_name = req.body.CATEGORY_NAME;
  var datas = [_name, _price, _prime_cost, _tax_mode, _barcode, _category_name];

  db.insertMenu(datas, function(isSuccess) {
    switch (isSuccess) {
      case true:
        res.status(200).send({
          status: 'success'
        });
        break;
      case ERROR.NO_NAME_IN_CATEGORY:
        res.status(500).send({
          status: 'error',
          message: 'Error! Choose a Category'
        });
        break;
      case ERROR.DUPLICATE:
        res.status(500).send({
          status: 'error',
          message: 'Error! Already Exists a name'
        });
        break;
      case ERROR.INSERT_MENU:
        res.status(500).send({
          status: 'error',
          message: 'Error! Insert error occurs'
        });
        break;
    }
  });
};

exports.delete = function(req, res) {
  var _name = req.body.NAME;
  var datas = [_name];

  db.deleteMenu(datas, function(isSuccess) {
    switch (isSuccess) {
      case true:
        res.status(200).send({
          status: 'success'
        });
        break;
      case ERROR.NO_NAME_IN_MENU:
        res.status(500).send({
          status: 'error',
          message: 'Error! There is no Name in Category'
        });
        break;
      case ERROR.DELETE_MENU:
        res.status(500).send({
          status: 'error',
          message: 'Error! Delete error occurs'
        });
        break;
    }
  });
};
