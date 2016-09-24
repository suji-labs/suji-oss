'use strict';

var app = require('../../../app');
var request = require('supertest');
var should = require('should');

describe('GET /api/v1.2/employee', function() {
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/v1.2/employee')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('POST /api/v1.2/employee/insert', function() {
  it('should respond with success', function(done) {
    request(app)
      .post('/api/v1.2/employee/insert')
      .send({
        'id': 1,
        'name': 'Mocha',
        'title': 'Tester',
        'employer': 'test',
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.should.exist;
        res.status.should.equal(200);
        done();
      });
  });
});

describe('POST /api/v1.2/employee/update', function() {
  it('should respond with success', function(done) {
    request(app)
      .post('/api/v1.2/employee/update')
      .send({
        'ID': 1,
        'NAME': 'MochaChange',
        'TITLE': 'TesterChange',
        'EMPLOYER': 'test',
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.should.exist;
        res.status.should.equal(200);
        done();
      });
  });
});

describe('POST /api/v1.2/employee/delete', function() {
  it('should respond with success', function(done) {
    request(app)
      .post('/api/v1.2/employee/delete')
      .send({
        'ID': 1
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.should.exist;
        res.status.should.equal(200);
        done();
      });
  });
});