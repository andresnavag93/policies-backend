const { COLLECTIONS } = require('../../utils/constants');

const MongoLib = require('../../store/mongo');

class CoveragesController {
  constructor() {
    this.collection = COLLECTIONS.coverages;
    this.mongoDB = new MongoLib();
  }
  async getCoverages(query = {}) {
    const coverages = await this.mongoDB.list(this.collection, query);
    return coverages || [];
  }

  async getCoverage({ id }) {
    const coverages = await this.mongoDB.get(this.collection, id);
    return coverages || [];
  }

  async createCoverage({ body }) {
    body.code = new Date().getTime();
    const coverages = await this.mongoDB.create(this.collection, body);
    return coverages || [];
  }

  async updateCoverage({ id, body } = {}) {
    const coverages = await this.mongoDB.update(this.collection, id, body);
    return coverages || [];
  }

  async deleteCoverage({ id} = {}) {
    const receipts = await this.mongoDB.update(this.collection, id, { is_delete: true });
    return receipts || [];
  }
}
module.exports = CoveragesController;
