const authRepository = require('./db/components/auth/repository');
const usersRepository = require('./db/components/users/repository');
const {
  config: { permissions },
} = require('../config');

const repositories = {
  auth: authRepository,
  users: usersRepository,
};

async function list(repository, where = {}) {
  const data = await repositories[repository].list(where);
  return data;
}

async function listAgents(repository, where = {}) {
  const data = await repositories[repository].listAgents({ role_id: permissions.agent });
  return data;
}
async function get(repository, id) {
  const data = await repositories[repository].get(id);
  return data;
}
async function update(repository, body, where) {
  const data = await repositories[repository].update(body, where);
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

module.exports = {
  list,
  listWhere,
  create,
  listAgents,
  get,
  update,
};
