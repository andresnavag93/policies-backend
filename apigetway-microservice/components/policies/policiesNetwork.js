const express = require('express');

const response = require('../../utils/network/response');
const { config } = require('../../config');

const {
  axiosPoliciesMicroservice,
  getData,
  postData,
  putData,
} = require('../../utils/network/axios');

// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

// Schema validator
const policiesSchema = require('../../schemas/policies')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const ajvErrors = require('ajv-errors')
const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
ajvErrors(ajv)

const router = express.Router();

async function list(req, res, next) {
  try {
    const endpoint = `policies`;
    const axiosResponse = await getData(axiosPoliciesMicroservice, endpoint, {});
    response.success(req, res, axiosResponse.data.data, 200);
  } catch (error) {
    try {
      response.error(req, res, error.response.data.message, error.response.data.statusCode);
    } catch {
      next();
    }
  }
}

async function get(req, res, next) {
  try {
    const endpoint = `policies/${req.params.id}`;
    const axiosResponse = await getData(axiosPoliciesMicroservice, endpoint, {});
    response.success(req, res, axiosResponse.data.data, 200);
  } catch (error) {
    try {
      response.error(req, res, error.response.data.message, error.response.data.statusCode);
    } catch {
      next();
    }
  }
}

async function listPoliciesByReceipt(req, res, next) {
  try {
    const endpoint = `policies/receipts/${req.params.id}`;
    const axiosResponse = await getData(axiosPoliciesMicroservice, endpoint, {});
    response.success(req, res, axiosResponse.data.data, 200);
  } catch (error) {
    try {
      response.error(req, res, error.response.data.message, error.response.data.statusCode);
    } catch {
      next();
    }
  }
}

async function create(req, res, next) {
  try {
    const validate = ajv.compile(policiesSchema)
    const valid = validate(req.body)
    if (!valid) {
      return response.error(req, res, JSON.stringify(validate.errors), 422);
    }
    const endpoint = `policies`;
    const axiosResponse = await postData(axiosPoliciesMicroservice, endpoint, req.body);
    response.success(req, res, axiosResponse.data.data, 200);
  } catch (error) {
    try {
      response.error(req, res, error.response.data.message, error.response.data.statusCode);
    } catch {
      next();
    }
  }
}

async function update(req, res, next) {
  try {
    const validate = ajv.compile(policiesSchema)
    const valid = validate(req.body)
    if (!valid) {
      return response.error(req, res, JSON.stringify(validate.errors), 422);
    }
    const endpoint = `policies/${req.params.id}`;
    const axiosResponse = await putData(axiosPoliciesMicroservice, endpoint, req.body);
    response.success(req, res, axiosResponse.data.data, 200);
  } catch (error) {
    try {
      response.error(req, res, error.response.data.message, error.response.data.statusCode);
    } catch {
      next();
    }
  }
}

// // Routes
if (config.auth.active !== 'false') {
  router.get(
    '/',
    auth({ secret: config.auth.jwtKey, algorithms: ['HS256'] }),
    guard.check([[config.permissions.admin], [config.permissions.agent]]),
    list,
  );
  router.get(
    '/:id',
    auth({ secret: config.auth.jwtKey, algorithms: ['HS256'] }),
    guard.check([[config.permissions.admin], [config.permissions.agent]]),
    get,
  );
  router.get(
    '/receipts/:id',
    auth({ secret: config.auth.jwtKey, algorithms: ['HS256'] }),
    guard.check([[config.permissions.admin], [config.permissions.agent]]),
    listPoliciesByReceipt,
  );
  router.post(
    '/',
    auth({ secret: config.auth.jwtKey, algorithms: ['HS256'] }),
    guard.check([[config.permissions.admin], [config.permissions.agent]]),
    create,
  );
  router.put(
    '/:id',
    auth({ secret: config.auth.jwtKey, algorithms: ['HS256'] }),
    guard.check([[config.permissions.admin], [config.permissions.agent]]),
    update,
  );
} else {
  router.get('/', list);
  router.get('/:id', get);
  router.get('/receipts/:id', listPoliciesByReceipt);
  router.post('/', create);
  router.put('/:id', update);
}

module.exports = router;
