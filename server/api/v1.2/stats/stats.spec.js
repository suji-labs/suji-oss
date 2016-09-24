'use strict';

var app = require('../../../app');
var request = require('supertest');
var should = require('should');

describe('GET /api/v1.2/stats/daily', function() {
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/v1.2/stats/daily')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.should.exist;
        res.status.should.equal(200);
        done();
      });
  });
});
