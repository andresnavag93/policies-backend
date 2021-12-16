const Model = require('../../model');
const Client = require('../clients/entity');
const Attribute = require('../attributes/entity');

class Address extends Model {
  static get tableName() {
    return 'addresses';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      client: {
        relation: Model.BelongsToOneRelation,
        modelClass: Client,
        join: {
          from: 'addresses.client_id',
          to: 'clients.id',
        },
      },
      state: {
        relation: Model.BelongsToOneRelation,
        modelClass: Attribute,
        join: {
          from: 'addresses.state_id',
          to: 'attributes.id',
        },
      },
    };
  }
}

module.exports = Address;
