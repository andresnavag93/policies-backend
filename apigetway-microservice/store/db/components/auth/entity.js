const Model = require('../../model');
const Attribute = require('../attributes/entity');
const User = require('../users/entity');

class Auth extends Model {
  static get namedFilters() {
    return {
      filter: (builder) => builder.select('id', 'email'),
    };
  }

  static get tableName() {
    return 'auth';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'auth.user_id',
          to: 'users.id',
        },
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Attribute,
        join: {
          from: 'auth.role_id',
          to: 'attributes.id',
        },
      },
    };
  }
}

module.exports = Auth;
