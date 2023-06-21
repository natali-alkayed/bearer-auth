'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login') }

    const token = req.headers.authorization.split(' ').pop();
    // console.log(token);
    const validUser = await users.authenticateToken(token);

      next();
    
    req.user = validUser;
    req.token = validUser.token;

  } catch (e) {
    // console.log(e);
    res.status(403).send('Invalid Login');
  }
}