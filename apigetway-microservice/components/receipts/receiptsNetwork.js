const express = require('express');

const response = require('../../utils/network/response');
const { config } = require('../../config');

const {
  axiosReceiptsMicroservice,
  getData,
  postData,
  putData,
  deleteData,
  axiosSinistersMicroservice,
  axiosPoliciesMicroservice
} = require('../../utils/network/axios');

// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

// Schema validator
const receiptsSchema = require('../../schemas/receipts')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const ajvErrors = require('ajv-errors')
const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
ajvErrors(ajv)

const router = express.Router();

async function list(req, res, next) {
  try {
    const endpoint = `receipts`;
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

async function get(req, res, next) {
  try {
    const endpoint = `receipts/${req.params.id}`;
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

async function create(req, res, next) {
  try {
    const validate = ajv.compile(receiptsSchema)
    const valid = validate(req.body)
    if (!valid) {
      return response.error(req, res, JSON.stringify(validate.errors), 422);
    }
    const endpoint = `receipts`;
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
    const validate = ajv.compile(receiptsSchema)
    const valid = validate(req.body)
    if (!valid) {
      return response.error(req, res, JSON.stringify(validate.errors), 422);
    }
    const endpoint = `receipts/${req.params.id}`;
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

async function updateDelete(req, res, next) {
  try {
    const endpoint = `receipts/${req.params.id}`;
    const axiosResponse = await deleteData(axiosReceiptsMicroservice, endpoint, {});

    const endpointCoverages = `coverages/receipts/${req.params.id}`;
    const axiosResponseCoverages = await getData(axiosReceiptsMicroservice, endpointCoverages, {});

    axiosResponseCoverages.data.data.map( async (coverage) => {
      const endpoint = `coverages/${coverage._id}`;
      await deleteData(axiosReceiptsMicroservice, endpoint, {});
    })

    const endpointSinisters = `sinisters/receipts/${req.params.id}`;
    const axiosResponseSinisters = await getData(axiosSinistersMicroservice, endpointSinisters, {});

    axiosResponseSinisters.data.data.map( async (sinister) => {
      const endpoint = `sinisters/${sinister._id}`;
      await deleteData(axiosSinistersMicroservice, endpoint, {});
    })

    const endpointPolicies = `policies/receipts/${req.params.id}`;
    const axiosResponsePolicies = await getData(axiosPoliciesMicroservice, endpointPolicies, {});

    axiosResponsePolicies.data.data.map( async (policy) => {
      const endpoint = `policies/${policy._id}`;
      await putData(axiosPoliciesMicroservice, endpoint, {receipt_id: null});
    })

    console.log(axiosResponsePolicies.data.data)


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
  router.delete(
    '/:id',
    auth({ secret: config.auth.jwtKey, algorithms: ['HS256'] }),
    guard.check([[config.permissions.admin], [config.permissions.agent]]),
    updateDelete,
  );
} else {
  router.get('/', list);
  router.get('/:id', get);
  router.post('/', create);
  router.put('/:id', update);
  router.delete('/:id', updateDelete);
}

module.exports = router;
