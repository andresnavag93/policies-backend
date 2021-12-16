const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  listStub,
  getStub,
  createStub,
  updateStub,
  MongoLibMock,
} = require('../../../utils/mocks/mongoLib');

const { receiptsMock } = require('../../../utils/mocks/receiptsMock');

describe('controller - receipts', function () {
  const ReceiptsController = proxyquire('../receiptsController', {
    '../../store/mongo': MongoLibMock,
  });

  const receiptsController = new ReceiptsController();

  describe('list method is called', async function () {
    it('should call the list Mongo method', async function () {
      await receiptsController.getReceipts();
      assert.strictEqual(listStub.called, true);
    });

    it('should return an array of receipts', async function () {
      const result = await receiptsController.getReceipts();
      const expected = receiptsMock;
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('get method is called', async function () {
    it('should call the get Mongo method', async function () {
      await receiptsController.getReceipt({ id: 1 });
      assert.strictEqual(getStub.called, true);
    });
  });

  describe('create method is called', async function () {
    it('should call the get Mongo method', async function () {
      await receiptsController.createReceipt({ body: {} });
      assert.strictEqual(createStub.called, true);
    });
  });
//
  describe('update method is called', async function () {
    it('should call the update Mongo method', async function () {
      await receiptsController.updateReceipt();
      assert.strictEqual(updateStub.called, true);
    });
  });
});