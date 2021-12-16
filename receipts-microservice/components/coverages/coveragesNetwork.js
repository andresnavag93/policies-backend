const express = require('express');
const CoveragesController = require('../coverages/coveragesController');
const response = require('../../utils/network/response');

function coveragesApi(app) {
  const router = express.Router();
  app.use('/coverages', router);

  const coveragesController = new CoveragesController();

  router.get('/', async function (req, res, next) {
    try {
      const data = await coveragesController.getCoverages(req.query);
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.get('/receipts/:id', async function (req, res, next) {
    const { id } = req.params;
    try {
      const data = await coveragesController.getCoverages({ receipt_id: id });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async function (req, res, next) {
    const { id } = req.params;
    try {
      const data = await coveragesController.getCoverage({ id });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async function (req, res, next) {
    const { body } = req;
    try {
      const data = await coveragesController.createCoverage({ body });
      response.success(req, res, data, 201);
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async function (req, res, next) {
    const { id } = req.params;
    const { body } = req;
    try {
      const data = await coveragesController.updateCoverage({ id, body });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async function (req, res, next) {
    const { id } = req.params;
    try {
      const data = await coveragesController.deleteCoverage({ id });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = coveragesApi;
