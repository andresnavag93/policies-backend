const express = require('express');

const response = require('../../utils/network/response');
const { config } = require('../../config');

const {
  axiosClientMicroservice,
  getData,
  postData,
  putData,
} = require('../../utils/network/axios');

// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

const router = express.Router();

async function list(req, res, next) {
  try {
    const endpoint = `clients`;
    const axiosResponse = await getData(axiosClientMicroservice, endpoint, {});
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
    const endpoint = `clients/${req.params.id}`;
    const axiosResponse = await getData(axiosClientMicroservice, endpoint, {});
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
    const endpoint = `clients`;
    const axiosResponse = await postData(axiosClientMicroservice, endpoint, req.body);
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
    const endpoint = `clients/${req.params.id}`;
    const axiosResponse = await putData(axiosClientMicroservice, endpoint, req.body);
    response.success(req, res, axiosResponse.data.data, 200);
  } catch (error) {
    try {
      response.error(req, res, error.response.data.message, error.response.data.statusCode);
    } catch {
      next();
    }
  }
}

// Routes
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
} else {
  router.get('/', list);
  router.get('/:id', get);
  router.post('/', create);
  router.put('/:id', update);
}

module.exports = router;
