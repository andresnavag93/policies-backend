const express = require('express');
const cors = require('cors');

const { config } = require('./config');
const sinistersApi = require('./components/sinisters/sinistersNetwork');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers.js');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

const app = express();
app.use(cors());

// body parser
app.use(express.json({limit:'50mb'}));

// routes
sinistersApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.api.port, async () => {
  console.log('Api listening on port ', config.api.port);
});
