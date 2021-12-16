'use strict';

/** Module for json web tokens creation */
const jwt = require('jsonwebtoken');

/** Creates a new token */
async function sign(payload, secret, expiresIn) {
  const token = await jwt.sign(payload, secret, { expiresIn });
  return token;
}

/** Verifies a provided token */
async function verify(token, secret) {
  let res = null;

  try {
    res = await jwt.verify(token, secret);
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return false;
    }
  }

  return res;
}

module.exports = {
  sign,
  verify,
};
