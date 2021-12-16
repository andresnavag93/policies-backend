const { COLLECTIONS } = require('../../utils/constants');

const MongoLib = require('../../store/mongo');

class ReceiptsController {
  constructor() {
    this.collection = COLLECTIONS.receipts;
    this.mongoDB = new MongoLib();
  }
  async getReceipts(query = {}) {
    const receipts = await this.mongoDB.list(this.collection, query);
    return receipts || [];
  }

  async getReceipt({ id }) {
    const receipts = await this.mongoDB.get(this.collection, id);
    return receipts || [];
  }

  async createReceipt({ body }) {
    body.code = new Date().getTime();
    const receipts = await this.mongoDB.create(this.collection, body);
    return receipts || [];
  }

  async updateReceipt({ id, body } = {}) {
    const receipts = await this.mongoDB.update(this.collection, id, body);
    return receipts || [];
  }

  async deleteReceipt({ id} = {}) {
    const receipts = await this.mongoDB.update(this.collection, id, { is_delete: true });
    return receipts || [];
  }
}
module.exports = ReceiptsController;
