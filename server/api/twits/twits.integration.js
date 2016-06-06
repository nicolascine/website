'use strict';

var app = require('../..');
import request from 'supertest';

var newTwits;

describe('Twits API:', function() {

  describe('GET /api/twitss', function() {
    var twitss;

    beforeEach(function(done) {
      request(app)
        .get('/api/twitss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          twitss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      twitss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/twitss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/twitss')
        .send({
          name: 'New Twits',
          info: 'This is the brand new twits!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTwits = res.body;
          done();
        });
    });

    it('should respond with the newly created twits', function() {
      newTwits.name.should.equal('New Twits');
      newTwits.info.should.equal('This is the brand new twits!!!');
    });

  });

  describe('GET /api/twitss/:id', function() {
    var twits;

    beforeEach(function(done) {
      request(app)
        .get('/api/twitss/' + newTwits._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          twits = res.body;
          done();
        });
    });

    afterEach(function() {
      twits = {};
    });

    it('should respond with the requested twits', function() {
      twits.name.should.equal('New Twits');
      twits.info.should.equal('This is the brand new twits!!!');
    });

  });

  describe('PUT /api/twitss/:id', function() {
    var updatedTwits;

    beforeEach(function(done) {
      request(app)
        .put('/api/twitss/' + newTwits._id)
        .send({
          name: 'Updated Twits',
          info: 'This is the updated twits!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTwits = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTwits = {};
    });

    it('should respond with the updated twits', function() {
      updatedTwits.name.should.equal('Updated Twits');
      updatedTwits.info.should.equal('This is the updated twits!!!');
    });

  });

  describe('DELETE /api/twitss/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/twitss/' + newTwits._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when twits does not exist', function(done) {
      request(app)
        .delete('/api/twitss/' + newTwits._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
