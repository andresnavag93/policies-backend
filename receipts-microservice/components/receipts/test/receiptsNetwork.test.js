const assert = require('assert');
const proxyquire = require('proxyquire');

const { receiptsMock, ReceiptsControllerMock } = require('../../../utils/mocks/receiptsMock');
const testServer = require('../../../utils/testServer');

describe('routes - receipts', function () {
  const route = proxyquire('../receiptsNetwork.js', {
    './receiptsController': ReceiptsControllerMock,
  });

  // test 
  const request = testServer(route);
  describe('GET /receipts', function () {
    it('should respond with status 200', function (done) {
      request.get('/receipts').expect(200, done);
    });

    it('should respond with the list of receipts', function (done) {
      request.get('/receipts').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: receiptsMock,
          error: false,
          statusCode: 200,
        });

        done();
      });
    });
  });

  describe('GET /receipts/:id', function () {
    it('should respond with status 200', function (done) {
      request.get('/receipts/60b57c2a60cadb0e4bc41b84').expect(200, done);
    });
  });

  describe('POST /receipts/', function () {
    it('should respond with status 201', function (done) {
      request.post('/receipts/').expect(201, done);
    });
  });

  describe('PUT /receipts/:id', function () {
    it('should respond with status 200', function (done) {
      request.put('/receipts/60b57c2a60cadb0e4bc41b84').expect(200, done);
    });
  });
});