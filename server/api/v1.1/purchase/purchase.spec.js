'use strict';

var app = require('../../../app');
var request = require('supertest');
var should = require('should');

describe('GET /api/v1.1/purchase/test', function() {
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/v1.1/purchase/test')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});


