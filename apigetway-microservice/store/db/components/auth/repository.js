const Base = require('../../baseRepository');
const Auth = require('./entity');

const fields = ['email', 'password', 'role_id', 'user_id'];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Auth;
  }
  async get(id) {
    let model;
    try {
      model = await this.model.query().select('id', 'email').findById(id).withGraphFetched('[user(filter)]');
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
  async listAgents(where = {}) {
    let model;
    try {
      model = await this.model
        .query()
        .select('id', 'email')
        .where(where)
        .withGraphFetched('[user(filter)]');
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
