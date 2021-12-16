require('dotenv').config();

const config = {
  api: {
    port: process.env.PORT,
  },
  dev: process.env.NODE_ENV !== 'production',
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT,
  },
};
console.log(config, 'client config')

module.exports = { config };
