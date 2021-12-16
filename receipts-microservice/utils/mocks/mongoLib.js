const sinon = require('sinon');

const { receiptsMock } = require('./receiptsMock');

const listStub = sinon.stub().resolves(receiptsMock);
const getStub = sinon.stub().resolves(receiptsMock[0]);
const createStub = sinon.stub().resolves(receiptsMock[0]);
const updateStub = sinon.stub().resolves(receiptsMock[0]);

class MongoLibMock {
  list(collection, query) {
    return listStub(collection, query);
  }

  get(collection, id) {
    return getStub(collection, id);
  }

  create(collection, data) {
    return createStub(collection, data);
  }

  update(collection, id, data) {
    return updateStub(collection, id, data);
  }
}

module.exports = {
  listStub,
  getStub,
  createStub,
  updateStub,
  MongoLibMock,
};
