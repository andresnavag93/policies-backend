const express = require('express');
const SinistersController = require('./sinistersController');
const response = require('../../utils/network/response');

function sinistersApi(app) {
  const router = express.Router();
  app.use('/sinisters', router);

  const sinistersController = new SinistersController();

  router.get('/', async function (req, res, next) {
    try {
      const data = await sinistersController.getSinisters(req.query);
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async function (req, res, next) {
    const { id } = req.params;
    try {
      const data = await sinistersController.getSinister({ id });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.get('/receipts/:id', async function (req, res, next) {
    const { id } = req.params;
    console.log(id)
    try {
      const data = await sinistersController.getSinisters({ receipt_id: id });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async function (req, res, next) {
    const { body } = req;
    try {
      const data = await sinistersController.createSinister({ body });
      response.success(req, res, data, 201);
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async function (req, res, next) {
    const { id } = req.params;
    const { body } = req;
    try {
      const data = await sinistersController.updateSinister({ id, body });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async function (req, res, next) {
    const { id } = req.params;
    try {
      const data = await sinistersController.deleteSinister({ id });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = sinistersApi;
