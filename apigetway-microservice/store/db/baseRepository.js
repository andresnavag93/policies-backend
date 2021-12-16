const cleanFields = (data = {}, fields) => {
  if (!fields.length) return data;
  let model = {};
  for (const i of fields) if (typeof data[i] !== 'undefined') model[i] = data[i];
  return model;
};
class baseRepository {
  constructor(fields = []) {
    this.model = this.getModel();
    this.fields = fields;
  }

  getModel() {
    throw new Error('You have to implement the method getModel!');
  }

  async list(where = {}) {
    let model;
    try {
      model = await this.model.query().where(where);
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

  async create(data) {
    let info = cleanFields(data, this.fields);
    let model;
    try {
      model = await this.model.query().insert(info);
      if (!model) return { error: 'not_found' };
      return model;
    } catch (err) {
      if (err.constraint) {
        return { error: err.constraint };
      }
      return { error: err.message };
    }
  }

  async update(data = {}, where = {}) {
    let info = cleanFields(data, this.fields);
    let model;
    try {
      model = await this.model.query().update(info).where(where);
      if (!model) return { error: 'not_found' };
      return model;
    } catch (err) {
      if (err.constraint) {
        return { error: err.constraint };
      }
      return { error: err.message };
    }
  }
}

module.exports = baseRepository;
