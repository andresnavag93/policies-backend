const clientRepository = require('./db/components/clients/repository');
const vehicleRepository = require('./db/components/vehicles/repository');
const attributeRepository = require('./db/components/attributes/repository');
const addressRepository = require('./db/components/addresses/repository');

const repositories = {
  clients: clientRepository,
  vehicles: vehicleRepository,
  attributes: attributeRepository,
  addresses: addressRepository,
};

async function list(repository, where = {}) {
  const data = await repositories[repository].list(where);
  return data;
}

async function get(repository, id) {
  const data = await repositories[repository].get(id);
  return data;
}

async function listWhere(repository, values) {
  const data = await repositories[repository].listWhere(values);
  return data;
}

async function create(repository, body) {
  const data = await repositories[repository].create(body);
  return data;
}

async function update(repository, body, where) {
  const data = await repositories[repository].update(body, where);
  return data;
}

module.exports = {
  list,
  get,
  listWhere,
  create,
  update,
};
