const sinistersMock = [
  {
    _id: '61397f1c209519461c166218',
    client_id: 1,
    vehicle_id: 1,
    observations: 'Información de la Hubo daño al casco por choque con carro de terceros. El conductor paso la luz roja y ocasionó daños a la puerta delantera derecha. Con Imagen',
    receipt_id: '6139731c29fbf44944ceeab9',
    aprobado: 0,
    policy_code: '1631153525058',
    monto: 200,
    created_at: '2021-01-09T04:00:00.000Z',
    updated_at: '2021-01-09T04:00:00.000Z',
    code: 1631158044840,
  },
];

class SinistersControllerMock {
  async getSinisters(query = {}) {
    return Promise.resolve(sinistersMock);
  }

  async getSinister({ id }) {
    return Promise.resolve(sinistersMock[0]);
  }

  async createSinister({ body }) {
    return Promise.resolve(sinistersMock[0]);
  }

  async updateSinister({ id, body } = {}) {
    return Promise.resolve(sinistersMock[0]);
  }
}

module.exports = {
  sinistersMock,
  SinistersControllerMock,
};
