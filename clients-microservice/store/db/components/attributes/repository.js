const Base = require('../../baseRepository');
const Attribute = require('./entity');

const fields = ['name'];

class Repository extends Base {
  constructor(props) {
    super(props);
  }

  getModel() {
    return Attribute;
  }

}

module.exports = new Repository(fields);
