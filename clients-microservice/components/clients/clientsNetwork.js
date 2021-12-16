const express = require('express');

const response = require('../../utils/network/response');
const Controller = require('./clients');

const router = express.Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', create);
router.put('/:id', update);

// Internal functions
function list(req, res, next) {
  Controller.list()
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

function create(req, res, next) {
  Controller.create(req.body)
    .then((data) => {
      if (data.error) {
        return response.error(req, res, data.error, 400);
      }
      response.success(req, res, data, 201);
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

module.exports = router;
