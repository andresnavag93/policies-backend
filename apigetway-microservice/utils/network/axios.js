const axios = require('axios');
const {
  CLIENT_MICROSERVICE_URL,
  POLICIES_MICROSERVICE_URL,
  SINISTERS_MICROSERVICE_URL,
  RECEIPTS_MICROSERVICE_URL,
} = require('./api');

// DEFAULTS CONFIGURATION
axios.defaults.headers.common['Content-Type'] = 'application/json';
const axiosClientMicroservice = axios.create({
  baseURL: CLIENT_MICROSERVICE_URL,
});

const axiosPoliciesMicroservice = axios.create({
  baseURL: POLICIES_MICROSERVICE_URL,
});

const axiosSinistersMicroservice = axios.create({
  baseURL: SINISTERS_MICROSERVICE_URL,
});

const axiosReceiptsMicroservice = axios.create({
  baseURL: RECEIPTS_MICROSERVICE_URL,
});

const getData = (axios, endPoint, params) => {
  const response = axios.get(endPoint, { params });
  return response;
};
const postData = (axios, endPoint, data) => {
  const response = axios.post(endPoint, data);
  return response;
};
const putData = (axios, endPoint, data) => {
  const response = axios.put(endPoint, data);
  return response;
};
const deleteData = (axios, endPoint, data) => {
  const response = axios.delete(endPoint, data);
  return response;
};

module.exports = {
  axiosClientMicroservice,
  axiosPoliciesMicroservice,
  axiosSinistersMicroservice,
  axiosReceiptsMicroservice,
  getData,
  postData,
  putData,
  deleteData
};
