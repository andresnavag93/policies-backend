/**
 * Coverages JSON Schema
 */

const Coverages = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    receipt_id: { anyOf: [{ type: 'string' }, { type: 'null' }] },
    receipt_code: { anyOf: [{ type: 'number' }, { type: 'null' }] },
    title: { type: 'string' },
    ramo: { type: 'number' },
    coverage_form_type: { type: 'integer' },
    total_sum_insured: { type: 'number' },
    //prima_percentage: { type: 'number' },
    prima: {type: 'number'},
    is_delete: { type: 'boolean' },
  },
  additionalProperties: true,
};

module.exports = Coverages;
