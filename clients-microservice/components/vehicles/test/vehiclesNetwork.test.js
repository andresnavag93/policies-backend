const assert = require('assert');
const proxyquire = require('proxyquire');

const { vehiclesMock, VehicleControllerMock } = require('../../../utils/mocks/vehiclesMock');
const testServer = require('../../../utils/testServer');

describe('routes - vehicles', function () {
  const route = proxyquire('../vehiclesNetwork.js', {
    './vehicles': proxyquire('../vehicles', {
      './vehiclesController': VehicleControllerMock,
      '../../store/mysql': [],
    }),
  });

  const request = testServer('/vehicles', route);
  describe('GET /vehicles', function () {
    it('should respond with status 200', function (done) {
      request.get('/vehicles').expect(200, done);
    });

    it('should respond with the list of vehicles', function (done) {
      request.get('/vehicles').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: vehiclesMock,
          error: false,
          statusCode: 200,
        });

        done();
      });
    });
  });

  describe('GET /vehicles/1', function () {
    it('should respond with status 200', function (done) {
      request.get('/vehicles/1').expect(200, done);
    });
  });

  describe('POST /vehicles/', function () {
    it('should respond with status 201', function (done) {
      request.post('/vehicles/clients/1').expect(201, done);
    });
  });

  describe('PUT /vehicles/', function () {
    it('should respond with status 200', function (done) {
      request.put('/vehicles/1/clients/1').expect(200, done);
    });
  });
});
