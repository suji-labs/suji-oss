'use strict';

var db = require('./employee.model.js');
var ERROR = require('../../module/error.code.js');
var fs = require('fs');
var path = require('path');

exports.uploadProfile = function(req, res) {
  var _id = req.params._id;
  var file = req.files.file;

  var tmpArr = file.path.split('/');
  var tmpName = tmpArr[tmpArr.length - 1].split('.');
  tmpName[0] = _id;
  var fileName = tmpName.join('.');
  tmpArr[tmpArr.length - 1] = fileName;
  var renamePath = tmpArr.join('/');

  fs.rename(file.path, renamePath, function(err) {
    if (err) throw err;
    console.log('renamed complete');
    res.status(200).send({
      status: 'success'
    });
  });
};


exports.showProfile = function(req, res) {
  var imgName = req.params._id + '.jpg';
  var imgPath = path.resolve('server/resources/profile/', imgName);
  console.log(imgPath);
  var img = fs.readFileSync(imgPath);
  res.writeHead(200, {
    'Content-Type': 'image/png'
  });
  res.end(img, 'binary');
};

exports.index = function(req, res) {
  db.selectEmployeeTable(function(results) {
    res.send(results);
  });
};

exports.insert = function(req, res) {
  var _id = req.body.id;
  var _name = req.body.name;
  var _title = req.body.title;
  var _employer = req.body.employer;
  var datas = [_id, _name, _title, _employer];

  db.insertEmployee(datas, function(isSuccess) {
    switch (isSuccess) {
      case true:
        res.status(200).send({
          status: 'success'
        });
        break;
      case ERROR.NO_USERNAME_IN_USER:
        res.status(500).send({
          status: 'error',
          message: 'Error! No Employer\'s name'
        });
        break;
      case ERROR.DUPLICATE:
        res.status(500).send({
          status: 'error',
          message: 'Error! Duplicate Employee ID'
        });
        break;
      case ERROR.INSERT_EMPLOYEE:
        res.status(500).send({
          status: 'error',
          message: 'Error! Insert Employee Error'
        });
        break;
    }
  });
};

exports.delete = function(req, res) {
  var _id = req.body.ID;
  var datas = [_id];
  var imgName = _id + '.jpg';
  var imgPath = path.resolve('server/resources/profile/', imgName);

  db.deleteEmployee(datas, function(isSuccess) {
    switch (isSuccess) {
      case true:
        res.status(200).send({
          status: 'success'
        });
        break;
      case ERROR.NO_ID_IN_EMPLOYEE:
        res.status(500).send({
          status: 'error',
          message: 'Error! There is no ID'
        });
        break;
      case ERROR.DELETE_EMPLOYEE:
        res.status(500).send({
          status: 'error',
          message: 'Error! Delete EMPLOYEE Error'
        });
        break;
    }
  });
  // File Delete
  fs.exists(imgPath, function(exists) {
    if (exists) {
      fs.unlink(imgPath, function(err) {
        if (err) throw err;
        console.log('successfully deleted ', imgPath);
      });
    }
  });
};

exports.update = function(req, res) {
  var _id = req.body.ID;
  var _name = req.body.NAME;
  var _title = req.body.TITLE;
  var _employer = req.body.EMPLOYER;
  var datas = [_id, _name, _title, _employer];

  db.updateEmployee(datas, function(isSuccess) {
    switch (isSuccess) {
      case true:
        res.status(200).send({
          status: 'success'
        });
        break;
      case ERROR.NO_USERNAME_IN_USER:
        res.status(500).send({
          status: 'error',
          message: 'Error! No Employer\'s name'
        });
        break;
      case ERROR.NO_ID_IN_EMPLOYEE:
        res.status(500).send({
          status: 'error',
          message: 'Error! No Employee ID'
        });
        break;
      case ERROR.UPDATE_EMPLOYEE:
        res.status(500).send({
          status: 'error',
          message: 'Error! Update Employee'
        });
        break;
    }
  });
};