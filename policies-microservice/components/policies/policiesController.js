const { COLLECTIONS } = require('../../utils/constants');

const MongoLib = require('../../store/mongo');

class PoliciesController {
  constructor() {
    this.collection = COLLECTIONS.policies;
    this.mongoDB = new MongoLib();
  }
  async getPolicies(query = {}) {
    const policies = await this.mongoDB.list(this.collection, query);
    return policies || [];
  }

  async getPolicy({ id }) {
    const policies = await this.mongoDB.get(this.collection, id);
    return policies || [];
  }

  async createPolicy({ body }) {
    body.code = new Date().getTime();
    const policies = await this.mongoDB.create(this.collection, body);
    return policies || [];
  }

  async updatePolicy({ id, body } = {}) {
    const policies = await this.mongoDB.update(this.collection, id, body);
    return policies || [];
  }
}
module.exports = PoliciesController;
