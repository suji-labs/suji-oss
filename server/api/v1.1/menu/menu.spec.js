'use strict';

var app = require('../../../app');
var request = require('supertest');
var should = require('should');

describe('GET /api/v1.1/menu/showByCategory', function() {
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/v1.1/menu/showByCategory')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('GET /api/v1.1/menu', function() {
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/v1.1/menu')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('GET /api/v1.1/menu/insert', function() {
  it('should respond success', function(done) {
    request(app)
      .get('/api/v1.1/menu/insert')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.should.exist;
        res.status.should.equal(200);
        done();
      });
  });
});

describe('POST /api/v1.1/menu/insert', function() {
  it('should respond with success', function(done) {
    request(app)
      .post('/api/v1.1/menu/insert')
      .send({
        'NAME': '_name',
        'PRICE': '_price',
        'PRIME_COST': '_cost',
        'TAX_MODE': 'false',
        'BARCODE': '_barcode',
        'CATEGORY_NAME': 'test'
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

describe('GET /api/v1.1/menu/test', function() {
  it('should respond success', function(done) {
    request(app)
      .get('/api/v1.1/menu/insert')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.should.exist;
        res.status.should.equal(200);
        done();
      });
  });
});

describe('POST /api/v1.1/menu/delete', function() {
  it('should respond with redirect on POST', function(done) {
    request(app)
      .post('/api/v1.1/menu/delete')
      .send({
        'NAME': '_name'
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
