const Model = require('../../model');
const Client = require('../clients/entity');

class Vehicle extends Model {
  static get tableName() {
    return 'vehicles';
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
          from: 'vehicles.client_id',
          to: 'clients.id',
        },
      },
    };
  }
}

module.exports = Vehicle;
