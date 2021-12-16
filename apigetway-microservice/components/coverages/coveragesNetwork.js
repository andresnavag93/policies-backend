const express = require('express');

const response = require('../../utils/network/response');
const { config } = require('../../config');

const {
  axiosReceiptsMicroservice,
  getData,
  postData,
  putData,
} = require('../../utils/network/axios');

// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

// Schema validator
const coveragesSchema = require('../../schemas/coverages')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const ajvErrors = require('ajv-errors')
const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
ajvErrors(ajv)

const router = express.Router();

async function list(req, res, next) {
  try {
    const endpoint = `coverages`;
    const axiosResponse = await getData(axiosReceiptsMicroservice, endpoint, { is_delete: false});
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
    const endpoint = `coverages/${req.params.id}`;
    const axiosResponse = await getData(axiosReceiptsMicroservice, endpoint, {});
    response.success(req, res, axiosResponse.data.data, 200);
  } catch (error) {
    try {
      response.error(req, res, error.response.data.message, error.response.data.statusCode);
    } catch {
      next();
    }
  }
}

async function listCoveragesByReceipt(req, res, next) {
  try {
    const endpoint = `coverages/receipts/${req.params.id}`;
    const axiosResponse = await getData(axiosReceiptsMicroservice, endpoint, { is_delete: false, is_delete: null});
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
    const validate = ajv.compile(coveragesSchema)
    const valid = validate(req.body)
    if (!valid) {
      return response.error(req, res, JSON.stringify(validate.errors), 422);
    }
    const endpoint = `coverages`;
    const axiosResponse = await postData(axiosReceiptsMicroservice, endpoint, req.body);
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
    const validate = ajv.compile(coveragesSchema)
    const valid = validate(req.body)
    if (!valid) {
      return response.error(req, res, JSON.stringify(validate.errors), 422);
    }
    const endpoint = `coverages/${req.params.id}`;
    const axiosResponse = await putData(axiosReceiptsMicroservice, endpoint, req.body);
    response.success(req, res, axiosResponse.data.data, 200);
  } catch (error) {
    try {
      response.error(req, res, error.response.data.message, error.response.data.statusCode);
    } catch {
      next();
    }
  }
}

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
    listCoveragesByReceipt,
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
  router.get('/receipts/:id', listCoveragesByReceipt);
  router.post('/', create);
  router.put('/:id', update);
}

module.exports = router;
