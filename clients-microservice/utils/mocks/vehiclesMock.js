const vehiclesMock = [
  {
    id: 1,
    policy_id: null,
    brand: 'Toyota',
    plate: 'AS123VR',
    model: 'yaris',
    serial: 'UIUIUID123123',
    year: 2011,
    doors_no: 4,
    client_id: 1,
    created_at: '2021-02-09T21:14:26.000Z',
    updated_at: '2021-02-09T21:14:26.000Z',
    client: {
      id: 1,
      name: 'User 1',
      lastname: 'User 100000',
      email: 'user1@gmail.com',
    },
  },
];

const VehicleControllerMock = function (injectedStore) {
  let store = injectedStore;

  async function list(where = {}) {
    return Promise.resolve(vehiclesMock);
  }

  async function get(id) {
    return Promise.resolve(vehiclesMock[0]);
  }

  async function create(body) {
    return Promise.resolve(vehiclesMock[0]);
  }

  async function update(body, id) {
    return Promise.resolve(vehiclesMock[0]);
  }

  return {
    list,
    get,
    create,
    update,
  };
};

module.exports = {
  vehiclesMock,
  VehicleControllerMock,
};
