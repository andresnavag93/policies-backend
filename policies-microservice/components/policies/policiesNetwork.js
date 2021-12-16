const express = require('express');
const PoliciesController = require('./policiesController');
const response = require('../../utils/network/response');

function policiesApi(app) {
  const router = express.Router();
  app.use('/policies', router);

  const policiesController = new PoliciesController();

  router.get('/', async function (req, res, next) {
    try {
      const data = await policiesController.getPolicies(req.query);
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.get('/receipts/:id', async function (req, res, next) {
    const { id } = req.params;
    try {
      const data = await policiesController.getPolicies({ receipt_id: id });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async function (req, res, next) {
    const { id } = req.params;
    try {
      const data = await policiesController.getPolicy({ id });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async function (req, res, next) {
    const { id } = req.params;
    try {
      const data = await policiesController.getPolicy({ id });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async function (req, res, next) {
    const { body } = req;
    try {
      const data = await policiesController.createPolicy({ body });
      response.success(req, res, data, 201);
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async function (req, res, next) {
    const { id } = req.params;
    const { body } = req;
    try {
      const data = await policiesController.updatePolicy({ id, body });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = policiesApi;
