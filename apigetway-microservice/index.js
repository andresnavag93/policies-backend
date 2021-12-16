const express = require('express');
const cors = require('cors');

const { config } = require('./config');
const auth = require('./components/auth/authNetwork');
const clients = require('./components/clients/clientsNetwork');
const vehicles = require('./components/vehicles/vehiclesNetwork');
const addresses = require('./components/addresses/addressesNetwork');
const policies = require('./components/policies/policiesNetwork');
const sinisters = require('./components/sinisters/sinistersNetwork');
const receipts = require('./components/receipts/receiptsNetwork');
const coverages = require('./components/coverages/coveragesNetwork');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers.js');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

const app = express();
app.use(cors());

// body parser
app.use(express.json({limit:'50mb'}));

// ROUTER
app.use('/auth', auth);
app.use('/clients', clients);
app.use('/vehicles', vehicles);
app.use('/addresses', addresses);
app.use('/policies', policies);
app.use('/sinisters', sinisters);
app.use('/receipts', receipts);
app.use('/coverages', coverages);
// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


app.listen(config.api.port, async () => {
  console.log('Api listening on port ', config.api.port);
});
