const Model = require('../../model');

class Attribute extends Model {
  static get namedFilters() {
    return {
      filter: (builder) => builder.select('id', 'name'),
    };
  }

  static get tableName() {
    return 'attributes';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      attribute: {
        relation: Model.BelongsToOneRelation,
        modelClass: Attribute,
        join: {
          from: 'attributes.attribute_id',
          to: 'attributes.id',
        },
      },
    };
  }

}

module.exports = Attribute;
