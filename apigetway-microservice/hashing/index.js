/* eslint-disable no-console */
'use strict';

/** Encryption Module */
const bcrypt = require('bcrypt');

/** Encrypts a password */
async function encrypt(password) {
  let hash;
  try {
    hash = await bcrypt.hash(password, 5);
  } catch (error) {
    return false;
  }

  return hash;
}

/** Checks password */
async function comparePassword(password, hash) {
  let res;
  try {
    res = await bcrypt.compare(password, hash);
  } catch (error) {
    return false;
  }

  return res;
}

module.exports = {
  encrypt,
  comparePassword,
};
