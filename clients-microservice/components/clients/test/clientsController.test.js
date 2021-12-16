const assert = require('assert');

const { clientsMock } = require('../../../utils/mocks/clientsMock');

const store = require('../../../utils/mocks/mysqlClientsMock');

describe('controller - clients', function () {
  const controller = require('../clientsController')(store);

  describe('list method is called', async function () {
    it('should call the list Mysql method', async function () {
      await controller.list();
      assert.strictEqual(store.listStub.called, true);
    });

    it('should return an array of clients', async function () {
      const result = await controller.list();
      const expected = clientsMock;
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('get method is called', async function () {
    it('should call the get Mysql method', async function () {
      await controller.get();
      assert.strictEqual(store.getStub.called, true);
    });
  });

  describe('create method is called', async function () {
    it('should call the get Mysql method', async function () {
      await controller.create();
      assert.strictEqual(store.createStub.called, true);
    });
  });

  describe('update method is called', async function () {
    it('should call the update Mysql method', async function () {
      await controller.update();
      assert.strictEqual(store.updateStub.called, true);
    });
  });
});
