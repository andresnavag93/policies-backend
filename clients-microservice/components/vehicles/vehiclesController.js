const { TABLES } = require('../../utils/constants');

module.exports = function (injectedStore) {
  let store = injectedStore;

  async function list(where = {}) {
    const data = await store.list(TABLES.vehicles, where);
    return data;
  }

  async function get(id) {
    const data = await store.get(TABLES.vehicles, id);
    return data;
  }

  async function create(body, id) {
    const client = await store.get(TABLES.clients, id);
    if (client.error) return client;
    const data = await store.create(TABLES.vehicles, { ...body, client_id: client.id });
    return data;
  }

  async function update(body, params) {
    let { id, client_id } = params;
    const data = await store.update(TABLES.vehicles, { ...body, client_id }, { id, client_id });
    return data;
  }

  return {
    list,
    get,
    create,
    update,
  };
};
