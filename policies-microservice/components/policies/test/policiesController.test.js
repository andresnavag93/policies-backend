const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  listStub,
  getStub,
  createStub,
  updateStub,
  MongoLibMock,
} = require('../../../utils/mocks/mongoLib');

const { policiesMock } = require('../../../utils/mocks/policiesMock');

describe('controller - policies', function () {
  const PoliciesController = proxyquire('../policiesController', {
    '../../store/mongo': MongoLibMock,
  });

  const policiesController = new PoliciesController();

  describe('list method is called', async function () {
    it('should call the list Mongo method', async function () {
      await policiesController.getPolicies();
      assert.strictEqual(listStub.called, true);
    });

    it('should return an array of policies', async function () {
      const result = await policiesController.getPolicies();
      const expected = policiesMock;
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('get method is called', async function () {
    it('should call the get Mongo method', async function () {
      await policiesController.getPolicy({ id: 1 });
      assert.strictEqual(getStub.called, true);
    });
  });

  describe('create method is called', async function () {
    it('should call the get Mongo method', async function () {
      await policiesController.createPolicy({ body: {} });
      assert.strictEqual(createStub.called, true);
    });
  });

  describe('update method is called', async function () {
    it('should call the update Mongo method', async function () {
      await policiesController.updatePolicy();
      assert.strictEqual(updateStub.called, true);
    });
  });
});
