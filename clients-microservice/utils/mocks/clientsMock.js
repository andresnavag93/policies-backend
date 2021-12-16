const clientsMock = [
  {
    id: 1,
    name: 'User 1',
    lastname: 'User 1',
    email: 'user1@gmail.com',
    birthday: '2021-02-09T04:00:00.000Z',
    document: 12345678,
    cellphone: '04141232323',
    address: 'Qta. Anaco, calle saturno, Santa Paula El Cafetal',
    city: 'Caracas',
    razon_social:"",
    occupation: 'Estudiante',
    gender: 'Masculino',
    document_type: 'V',
    civil_status: 'Soltero',
    state: 'Caracas',
    agent_id: null,
    is_active: 1,
    created_at: '2021-02-09T21:14:26.000Z',
    updated_at: '2021-02-09T21:43:25.000Z',
  },
];

const ClientControllerMock = function (injectedStore) {
  let store = injectedStore;

  async function list(where = {}) {
    return Promise.resolve(clientsMock);
  }

  async function get(id) {
    return Promise.resolve(clientsMock[0]);
  }

  async function create(body) {
    return Promise.resolve(clientsMock[0]);
  }

  async function update(body, id) {
    return Promise.resolve(clientsMock[0]);
  }

  return {
    list,
    get,
    create,
    update,
  };
};

module.exports = {
  clientsMock,
  ClientControllerMock,
};
