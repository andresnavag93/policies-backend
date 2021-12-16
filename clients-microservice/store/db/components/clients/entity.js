const Model = require('../../model');
const Attribute = require('../attributes/entity');

class Client extends Model {
  static get namedFilters() {
    return {
      filter: (builder) => builder.select('id', 'name', 'lastname', 'email'),
    };
  }

  static get tableName() {
    return 'clients';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    const Vehicle = require('../vehicles/entity');
    const Address = require('../addresses/entity');

    return {
      vehicles: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: 'clients.id',
          to: 'vehicles.client_id',
        },
      },
      addresses: {
        relation: Model.HasManyRelation,
        modelClass: Address,
        join: {
          from: 'clients.id',
          to: 'addresses.client_id',
        },
      },
      gender: {
        relation: Model.BelongsToOneRelation,
        modelClass: Attribute,
        join: {
          from: 'clients.gender_id',
          to: 'attributes.id',
        },
      },
      civil_status: {
        relation: Model.BelongsToOneRelation,
        modelClass: Attribute,
        join: {
          from: 'clients.civil_status_id',
          to: 'attributes.id',
        },
      },
      document_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: Attribute,
        join: {
          from: 'clients.document_type_id',
          to: 'attributes.id',
        },
      },
    };
  }
}

module.exports = Client;
