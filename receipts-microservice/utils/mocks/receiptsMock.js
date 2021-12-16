const receiptsMock = [
  {
    _id: '60b57c2a60cadb0e4bc41b84',
    issue_date: '2021-01-09T04:00:00.000Z',
    client_id: 1,
    vehicle_id: 4,
    observations: 'Información de la poliza',
    receipt_id: 1,
    receipt_number: 1,
    prima: 20000,
    total_sum_insured: 20000,
    agent_bonus: 1000,
    deducible: 500,
    next_payment_date: '2022-01-09T04:00:00.000Z',
    valid_from: '2021-01-09T04:00:00.000Z',
    valid_until: '2022-01-09T04:00:00.000Z',
    created_at: '2021-01-09T04:00:00.000Z',
    updated_at: '2021-01-09T04:00:00.000Z',
    code: 1622506538732,
  },
];

class ReceiptsControllerMock {
  async getReceipts(query = {}) {
    return Promise.resolve(receiptsMock);
  }

  async getReceipt({ id }) {
    return Promise.resolve(receiptsMock[0]);
  }

  async createReceipt({ body }) {
    return Promise.resolve(receiptsMock[0]);
  }

  async updateReceipt({ id, body } = {}) {
    return Promise.resolve(receiptsMock[0]);
  }
}

module.exports = {
  receiptsMock,
  ReceiptsControllerMock,
};
