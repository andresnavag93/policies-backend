const Model = require('../../model');
const Attribute = require('../attributes/entity');

class User extends Model {
  static get namedFilters() {
    return {
      filter: (builder) => builder.select('id', 'name', 'lastname','bono'),
    };
  }

  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      gender: {
        relation: Model.BelongsToOneRelation,
        modelClass: Attribute,
        join: {
          from: 'users.gender_id',
          to: 'attributes.id',
        },
      },
    };
  }

}

module.exports = User;
