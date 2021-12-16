/**
 * Policies JSON Schema
 */

const Policies = {
  type: 'object',
  properties: {
    _id: { type: 'string'},
    title: { type: 'string'},
    code: { anyOf: [
      { type: 'number'},
      { type: 'null' }
    ]},
    date: {
      type: 'string',
      format: 'date'
    },
    client_id: { type: 'integer'},
    enabled: { type: 'boolean'},
    observations: { type: 'string'},
    renewable: { type: 'boolean'},
    vehicle_value: { type: 'number'},
    vehicle_id: { type: 'integer'},
    agent_id: { type: 'integer'},
    receipt_id: { anyOf: [
      { type: 'string'},
      { type: 'null' }
    ]},
    receipt_code: { anyOf: [
      { type: 'number'},
      { type: 'null' }
    ]},
  },
  additionalProperties: true,
};

module.exports = Policies;