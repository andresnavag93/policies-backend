const sinon = require('sinon');

const { sinistersMock } = require('./sinistersMock');

const listStub = sinon.stub().resolves(sinistersMock);
const getStub = sinon.stub().resolves(sinistersMock[0]);
const createStub = sinon.stub().resolves(sinistersMock[0]);
const updateStub = sinon.stub().resolves(sinistersMock[0]);

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
