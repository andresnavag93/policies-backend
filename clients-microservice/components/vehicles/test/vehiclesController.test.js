const assert = require('assert');

const { vehiclesMock } = require('../../../utils/mocks/vehiclesMock');

const store = require('../../../utils/mocks/mysqlVehiclesMock');

describe('controller - vehicles', function () {
  const controller = require('../vehiclesController')(store);

  describe('list method is called', async function () {
    it('should call the list Mysql method', async function () {
      await controller.list();
      assert.strictEqual(store.listStub.called, true);
    });

    it('should return an array of vehicles', async function () {
      const result = await controller.list();
      const expected = vehiclesMock;
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
      await controller.update({}, { id: 1, client_id: 1 });
      assert.strictEqual(store.updateStub.called, true);
    });
  });
});
