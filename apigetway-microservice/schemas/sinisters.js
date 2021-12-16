/**
 * Sinister JSON Schema
 */

const Sinisters = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    receipt_id: { type: 'string' },
    receipt_code: { type: 'number' },
    code: { anyOf: [
        { type: 'number'},
        { type: 'null' }
      ]},
    policy_code: { type: 'number' },
    observations: { type: 'string' },
    monto: { type: 'number' },
    date: {
      type: 'string',
      format: 'date',
    },
    estado_de_aprobacion: { type: 'integer' },
    is_delete: { type: 'boolean'},
  },
  additionalProperties: true,
};

module.exports = Sinisters;
