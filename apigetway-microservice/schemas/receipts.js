/**
 * Receipts JSON Schema
 */

const Receipts = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    policy_id: { type: 'string' },
    policy_code: { type: 'number'},
    code: { anyOf: [
        { type: 'number'},
        { type: 'null' }
      ]},
    vehicle_id: { type: 'integer' },
    client_id: { type: 'integer' },
    issue_date: {
      type: 'string',
      format: 'date',
    },
    valid_from: {
      type: 'string',
      format: 'date',
    },
    valid_until: {
      type: 'string',
      format: 'date',
    },
    agent_bonus: { type: 'number' },
    prima: { type: 'number' },
    is_delete: { type: 'boolean'},
  },
  additionalProperties: true,
};

module.exports = Receipts;
