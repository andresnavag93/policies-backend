const express = require('express');
const cors = require('cors');

const { config } = require('./config');
const clients = require('./components/clients/clientsNetwork');
const vehicles = require('./components/vehicles/vehiclesNetwork');
const addresses = require('./components/addresses/addressesNetwork');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers.js');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

const app = express();
app.use(cors());

// body parser
app.use(express.json());

// ROUTER
app.use('/clients', clients);
app.use('/addresses', addresses);
app.use('/vehicles', vehicles);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

const db = require('./store/db');

app.listen(config.api.port, async () => {
  console.log('Api listening on port ', config.api.port);
});
