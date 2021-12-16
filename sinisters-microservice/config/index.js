require('dotenv').config();

const config = {
  api: {
    port: process.env.PORT || 3005,
  },
  dev: process.env.NODE_ENV !== 'production',
  mongodb: {
    dbUser: process.env.MONGO_USER,
    dbPassword: process.env.MONGO_PASS,
    dbHost: process.env.MONGO_HOST,
    dbName: process.env.MONGO_NAME,
  },
};

module.exports = { config };
