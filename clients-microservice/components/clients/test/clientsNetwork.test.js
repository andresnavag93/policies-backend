const assert = require('assert');
const proxyquire = require('proxyquire');

const { clientsMock, ClientControllerMock } = require('../../../utils/mocks/clientsMock');
const testServer = require('../../../utils/testServer');

describe('routes - clients', function () {
  const route = proxyquire('../clientsNetwork.js', {
    './clients': proxyquire('../clients', {
      './clientsController': ClientControllerMock,
      '../../store/mysql': [],
    }),
  });

  const request = testServer('/clients', route);
  describe('GET /clients', function () {
    it('should respond with status 200', function (done) {
      request.get('/clients').expect(200, done);
    });

    it('should respond with the list of clients', function (done) {
      request.get('/clients').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: clientsMock,
          error: false,
          statusCode: 200,
        });

        done();
      });
    });
  });

  describe('GET /clients/:id', function () {
    it('should respond with status 200', function (done) {
      request.get('/clients/1').expect(200, done);
    });
  });

  describe('POST /clients/', function () {
    it('should respond with status 201', function (done) {
      request.post('/clients/').expect(201, done);
    });
  });

  describe('PUT /clients/', function () {
    it('should respond with status 200', function (done) {
      request.put('/clients/1').expect(200, done);
    });
  });
});
