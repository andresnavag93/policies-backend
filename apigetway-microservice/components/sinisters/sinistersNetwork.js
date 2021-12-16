const express = require('express');

const response = require('../../utils/network/response');
const { config } = require('../../config');

const {
  axiosSinistersMicroservice,
  getData,
  postData,
  putData,
} = require('../../utils/network/axios');

// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

// Schema validator
const sinistersSchema = require('../../schemas/sinisters')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const ajvErrors = require('ajv-errors')
const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
ajvErrors(ajv)

const router = express.Router();

async function list(req, res, next) {
  try {
    const endpoint = `sinisters`;
    const axiosResponse = await getData(axiosSinistersMicroservice, endpoint, { is_delete: false, is_delete: null});
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
    const endpoint = `sinisters/${req.params.id}`;
    const axiosResponse = await getData(axiosSinistersMicroservice, endpoint, {});
    response.success(req, res, axiosResponse.data.data, 200);
  } catch (error) {
    try {
      response.error(req, res, error.response.data.message, error.response.data.statusCode);
    } catch {
      next();
    }
  }
}

async function listSinisterByReceipt(req, res, next) {
  try {
    const endpoint = `sinisters/receipts/${req.params.id}`;
    const axiosResponse = await getData(axiosSinistersMicroservice, endpoint, { is_delete: false});
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
    const validate = ajv.compile(sinistersSchema)
    const valid = validate(req.body)
    if (!valid) {
      return response.error(req, res, JSON.stringify(validate.errors), 422);
    }
    const endpoint = `sinisters`;
    const axiosResponse = await postData(axiosSinistersMicroservice, endpoint, req.body);
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
    const validate = ajv.compile(sinistersSchema)
    const valid = validate(req.body)
    if (!valid) {
      return response.error(req, res, JSON.stringify(validate.errors), 422);
    }
    const endpoint = `sinisters/${req.params.id}`;
    const axiosResponse = await putData(axiosSinistersMicroservice, endpoint, req.body);
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
    listSinisterByReceipt,
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
  router.get('/receipts/:id', listSinisterByReceipt);
  router.post('/', create);
  router.put('/:id', update);
}

module.exports = router;
