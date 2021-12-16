const { TABLES } = require('../../utils/constants');

module.exports = function (injectedStore) {
  let store = injectedStore;

  async function list(where = {}) {
    const data = await store.list(TABLES.clients, where);
    return data;
  }

  async function get(id) {
    const data = await store.get(TABLES.clients, id);
    return data;
  }

  async function create(body) {
    const data = await store.create(TABLES.clients, body);
    return data;
  }

  async function update(body, id) {
    const client = await store.get(TABLES.clients, id);
    if (client.error) return client;
    const data = await store.update(TABLES.clients, body, { id: client.id });
    return data;
  }

  return {
    list,
    get,
    create,
    update,
  };
};
