'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(" ");
  let encodedValue = basic.pop();
  let [username, pass] = base64.decode(encodedValue).split(':');
console.log(pass);
  try {
    req.user = await users.authenticateBasic(username, pass)
    next();
  } catch (e) {
    console.log(e);
    res.status(403).send('Invalid Login');
  }

}