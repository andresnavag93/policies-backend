const express = require('express');
const response = require('../../utils/network/response');
const Controller = require('./auth');
const { config } = require('../../config');

const router = express.Router();

// JWT
const auth = require('express-jwt');
const guard = require('express-jwt-permissions')();

// Internal functions
function login(req, res, next) {
  Controller.login(req.body)
    .then((data) => {
      if (data.error) {
        return response.error(req, res, data.error, 404);
      }
      response.success(req, res, data, 200);
    })
    .catch(next);
}
function get(req, res, next) {
  Controller.get(req.params.id)
    .then((data) => {
      if (data.error) {
        return response.error(req, res, data.error, 404);
      }
      response.success(req, res, data, 200);
    })
    .catch(next);
}
function register(req, res, next) {
  Controller.register(req.body)
    .then((data) => {
      if (data.error) {
        return response.error(req, res, data.error, 404);
      }
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function update(req, res, next) {
  Controller.update(req.body, req.params.id)
    .then((data) => {
      if (data.error) {
        return response.error(req, res, data.error, 400);
      }
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function listAgents(req, res, next) {
  Controller.listAgents()
    .then((data) => {
      if (data.error) {
        return response.error(req, res, data.error, 404);
      }
      response.success(req, res, data, 200);
    })
    .catch(next);
}

// Routes
if (config.auth.active !== 'false') {
  router.post('/login', login);
  router.post(
    '/register',
    auth({ secret: config.auth.jwtKey, algorithms: ['HS256'] }),
    guard.check([[config.permissions.admin]]),
    register,
  );
  router.get(
    '/agents',
    auth({ secret: config.auth.jwtKey, algorithms: ['HS256'] }),
    guard.check([[config.permissions.admin], [config.permissions.agent]]),
    listAgents,
  );
  router.get(
    '/:id',
    auth({ secret: config.auth.jwtKey, algorithms: ['HS256'] }),
    guard.check([[config.permissions.admin], [config.permissions.agent]]),
    get,
  );
  router.put(
    '/:id',
    auth({ secret: config.auth.jwtKey, algorithms: ['HS256'] }),
    guard.check([[config.permissions.admin], [config.permissions.agent]]),
    update,
  );
} else {
  router.post('/login', login);
  router.post('/register', register);
  router.get('/agents', listAgents);
  router.get('/:id', get);
  router.patch('/:id', update);
}

module.exports = router;
