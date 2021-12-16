const { config } = require('../../config');

const CLIENT_MICROSERVICE_URL = config.url.clients;
const POLICIES_MICROSERVICE_URL = config.url.policies;
const SINISTERS_MICROSERVICE_URL = config.url.sinisters;
const RECEIPTS_MICROSERVICE_URL = config.url.receipts;

module.exports = {
  CLIENT_MICROSERVICE_URL,
  POLICIES_MICROSERVICE_URL,
  SINISTERS_MICROSERVICE_URL,
  RECEIPTS_MICROSERVICE_URL,
};
