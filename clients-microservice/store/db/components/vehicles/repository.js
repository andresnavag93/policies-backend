const Base = require('../../baseRepository');
const Vehicle = require('./entity');

const fields = [
  'client_id',
  'policy_id',
  'brand',
  'plate',
  'model',
  'serial',
  'year',
  'doors_no',
  'version',
  'pasajeros',
  'civi',
  'type',
  'rate_width_coverage',
  'rate_total_lost',
  'sum_assured',
];
class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Vehicle;
  }

  async list() {
    let model;
    try {
      model = await this.model.query().withGraphFetched('[client(filter)]');
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
