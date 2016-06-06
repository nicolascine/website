'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var twitsCtrlStub = {
  index: 'twitsCtrl.index',
  show: 'twitsCtrl.show',
  create: 'twitsCtrl.create',
  update: 'twitsCtrl.update',
  destroy: 'twitsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var twitsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './twits.controller': twitsCtrlStub
});

describe('Twits API Router:', function() {

  it('should return an express router instance', function() {
    twitsIndex.should.equal(routerStub);
  });

  describe('GET /api/twitss', function() {

    it('should route to twits.controller.index', function() {
      routerStub.get
        .withArgs('/', 'twitsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/twitss/:id', function() {

    it('should route to twits.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'twitsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/twitss', function() {

    it('should route to twits.controller.create', function() {
      routerStub.post
        .withArgs('/', 'twitsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/twitss/:id', function() {

    it('should route to twits.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'twitsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/twitss/:id', function() {

    it('should route to twits.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'twitsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/twitss/:id', function() {

    it('should route to twits.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'twitsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
