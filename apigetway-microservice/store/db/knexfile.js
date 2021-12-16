const path = require('path');

const { config } = require('../../config');
const BASE_PATH = path.join(__dirname);

const options = {
  client: 'mysql',
  connection: {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
  },
  migrations: {
    directory: path.join(BASE_PATH, 'migrations'),
  },
  seeds: {
    directory: path.join(BASE_PATH, 'seeds'),
  },
  pool: {
    min: 1,
    max: 1,
  },
};

module.exports = options;
