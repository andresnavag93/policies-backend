const Base = require('../../baseRepository');
const User = require('./entity');

const fields = ['lastname', 'name','bono'];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return User;
  }
  async get(id) {
    let model;
    try {
      model = await this.model.query().findById(id);
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
