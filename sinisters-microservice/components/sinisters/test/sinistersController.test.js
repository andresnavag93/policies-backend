const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  listStub,
  getStub,
  createStub,
  updateStub,
  MongoLibMock,
} = require('../../../utils/mocks/mongoLib');

const { sinistersMock } = require('../../../utils/mocks/sinistersMock');

describe('controller - sinisters', function () {
  const SinistersController = proxyquire('../sinistersController', {
    '../../store/mongo': MongoLibMock,
  });

  const sinistersController = new SinistersController();

  describe('list method is called', async function () {
    it('should call the list Mongo method', async function () {
      await sinistersController.getSinisters();
      assert.strictEqual(listStub.called, true);
    });

    it('should return an array of sinisters', async function () {
      const result = await sinistersController.getSinisters();
      const expected = sinistersMock;
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('get method is called', async function () {
    it('should call the get Mongo method', async function () {
      await sinistersController.getSinister({ id: 1 });
      assert.strictEqual(getStub.called, true);
    });
  });

  describe('create method is called', async function () {
    it('should call the get Mongo method', async function () {
      await sinistersController.createSinister({ body: {} });
      assert.strictEqual(createStub.called, true);
    });
  });

  describe('update method is called', async function () {
    it('should call the update Mongo method', async function () {
      await sinistersController.updateSinister();
      assert.strictEqual(updateStub.called, true);
    });
  });
});