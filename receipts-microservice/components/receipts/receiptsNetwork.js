const express = require('express');
const ReceiptsController = require('./receiptsController');
const response = require('../../utils/network/response');

function receiptsApi(app) {
  const router = express.Router();
  app.use('/receipts', router);

  const receiptsController = new ReceiptsController();

  router.get('/', async function (req, res, next) {
    try {
      const data = await receiptsController.getReceipts(req.query);
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async function (req, res, next) {
    const { id } = req.params;
    try {
      const data = await receiptsController.getReceipt({ id });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async function (req, res, next) {
    const { body } = req;
    try {
      const data = await receiptsController.createReceipt({ body });
      response.success(req, res, data, 201);
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async function (req, res, next) {
    const { id } = req.params;
    const { body } = req;
    try {
      const data = await receiptsController.updateReceipt({ id, body });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async function (req, res, next) {
    const { id } = req.params;
    try {
      const data = await receiptsController.deleteReceipt({ id });
      response.success(req, res, data, 200);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = receiptsApi;
