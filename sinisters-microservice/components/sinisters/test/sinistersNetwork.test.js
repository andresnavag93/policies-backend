const assert = require('assert');
const proxyquire = require('proxyquire');

const { sinistersMock, SinistersControllerMock } = require('../../../utils/mocks/sinistersMock');
const testServer = require('../../../utils/testServer');

describe('routes - sinisters', function () {
  const route = proxyquire('../sinistersNetwork.js', {
    './sinistersController': SinistersControllerMock,
  });

  const request = testServer(route);
  describe('GET /sinisters', function () {
    it('should respond with status 200', function (done) {
      request.get('/sinisters').expect(200, done);
    });

    it('should respond with the list of sinisters', function (done) {
      request.get('/sinisters').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: sinistersMock,
          error: false,
          statusCode: 200,
        });

        done();
      });
    });
  });

  describe('GET /sinisters/:id', function () {
    it('should respond with status 200', function (done) {
      request.get('/sinisters/61397f1c209519461c166218').expect(200, done);
    });
  });

  describe('POST /sinisters/', function () {
    it('should respond with status 201', function (done) {
      request.post('/sinisters/').expect(201, done);
    });
  });

  describe('PUT /sinisters/:id', function () {
    it('should respond with status 200', function (done) {
      request.put('/sinisters/61397f1c209519461c166218').expect(200, done);
    });
  });
});