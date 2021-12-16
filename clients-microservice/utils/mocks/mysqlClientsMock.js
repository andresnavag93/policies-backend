const sinon = require('sinon');
const { clientsMock } = require('./clientsMock');

const listStub = sinon.stub().resolves(clientsMock);
const getStub = sinon.stub().resolves(clientsMock[0]);
const createStub = sinon.stub().resolves(clientsMock[0]);
const updateStub = sinon.stub().resolves(clientsMock[0]);

async function list(repository, where = {}) {
  const data = await listStub(where);
  return data;
}

async function get(repository, body) {
  const data = await getStub(body);
  return data;
}

async function create(repository, body) {
  const data = await createStub(body);
  return data;
}

async function update(repository, body, where) {
  const data = await updateStub(body, where);
  return data;
}

module.exports = {
  list,
  get,
  create,
  update,
  listStub,
  getStub,
  createStub,
  updateStub,
};
