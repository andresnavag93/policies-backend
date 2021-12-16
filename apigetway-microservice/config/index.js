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
  auth: {
    jwtKey: process.env.JWT_KEY || '',
    active: process.env.AUTH_ACTIVE || 'true',
  },
  url: {
    clients: process.env.CLIENT_URL,
    policies: process.env.POLICIES_URL,
    sinisters: process.env.SINISTERS_URL,
    receipts: process.env.RECEIPTS_URL,
  },
  permissions: {
    admin: 3,
    agent: 4,
  },
};
module.exports = { config };
