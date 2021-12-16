const Base = require('../../baseRepository');
const Address = require('./entity');

const fields = ['client_id','line_1', 'state_id', 'city'];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Address;
  }

  async list() {
    let model;
    try {
      model = await this.model.query().withGraphFetched('[client(filter), state]');
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
