const policiesMock = [
  {
    _id: '5ff9f8bbdd9c5a5a1e608130',
    type: 'Seguro de Carro',
    title: 'Poliza de seguro',
    code: 1614025140712,
    date: '2021-01-09T04:00:00.000Z',
    enabled: true,
    renewable: true,
    vehicle_value: 2500,
    client_id: 1,
    vehicle_id: 1,
    observations: 'Información de la poliza',
    receipt_id: null,
    created_at: '2021-01-09T04:00:00.000Z',
    updated_at: '2021-01-09T04:00:00.000Z',
  },
];

class PoliciesControllerMock {
  async getPolicies(query = {}) {
    return Promise.resolve(policiesMock);
  }

  async getPolicy({ id }) {
    return Promise.resolve(policiesMock[0]);
  }

  async createPolicy({ body }) {
    return Promise.resolve(policiesMock[0]);
  }

  async updatePolicy({ id, body } = {}) {
    return Promise.resolve(policiesMock[0]);
  }
}

module.exports = {
  policiesMock,
  PoliciesControllerMock,
};
