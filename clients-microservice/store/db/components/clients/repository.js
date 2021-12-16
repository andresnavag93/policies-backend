const Base = require('../../baseRepository');
const Client = require('./entity');

const fields = [
  'name',
  'lastname',
  'email',
  'birthday',
  'document',
  'cellphone',
  'occupation',
  'razon_social',
  'gender_id',
  'document_type_id',
  'civil_status_id',
  'agent_id',
  'is_active',
];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Client;
  }

  async get(id) {
    let model;
    try {
      model = await this.model.query().findById(id).withGraphFetched('[vehicles, gender, addresses, civil_status, document_type]');
      if (!model) return { error: 'not_found' };
      return model;
    } catch (err) {
      console.log(err.message);
      if (err.constraint) {
        return { error: err.constraint };
      }
      return { error: err.message };
    }
  }

  async list(where = {}) {
    let model;
    try {
      model = await this.model.query().where(where).withGraphFetched('[document_type]');;
      if (!model) return { error: 'not_found' };
      return model;
    } catch (err) {
      console.log(err.message);
      if (err.constraint) {
        return { error: err.constraint };
      }
      return { error: err.message };
    }
  }
}

module.exports = new Repository(fields);
