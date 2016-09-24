'use strict';

var app = require('../../../app');
var request = require('supertest');
var should = require('should');

describe('GET /api/v1.1/category', function() {
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/v1.1/category')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('POST /api/v1.1/category/insert', function() {
  it('should respond', function(done) {
    request(app)
      .post('/api/v1.1/category/insert')
      .send({
        'NAME': 'test'
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
