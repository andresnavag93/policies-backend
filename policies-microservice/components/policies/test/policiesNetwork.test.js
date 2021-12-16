const assert = require('assert');
const proxyquire = require('proxyquire');

const { policiesMock, PoliciesControllerMock } = require('../../../utils/mocks/policiesMock');
const testServer = require('../../../utils/testServer');

describe('routes - policies', function () {
  const route = proxyquire('../policiesNetwork.js', {
    './policiesController': PoliciesControllerMock,
  });

  const request = testServer(route);
  describe('GET /policies', function () {
    it('should respond with status 200', function (done) {
      request.get('/policies').expect(200, done);
    });

    it('should respond with the list of policies', function (done) {
      request.get('/policies').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: policiesMock,
          error: false,
          statusCode: 200,
        });

        done();
      });
    });
  });

  describe('GET /policies/:id', function () {
    it('should respond with status 200, OK', function (done) {
      request.get('/policies/5ff9f8bbdd9c5a5a1e608130').expect(200, done);
    });
  });

  describe('POST /policies/', function () {
    it('should respond with status 201, Created', function (done) {
      request.post('/policies/').expect(201, done);
    });
  });

  describe('PUT /policies/:id', function () {
    it('should respond with status 200, OK', function (done) {
      request.put('/policies/5ff9f8bbdd9c5a5a1e608130').expect(200, done);
    });
  });
});
