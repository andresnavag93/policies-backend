const express = require('express');
const supertest = require('supertest');

function testServer(route, controller) {
  const app = express();
  app.use(route, controller);
  return supertest(app);
}

module.exports = testServer;
