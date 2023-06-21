'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/router/index.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);



app.get('/', welcomeHandler);
function welcomeHandler(req, res) {
    res.status(200).send('hi');
}


function startup(port) {
  app.listen(port, () => {
      console.log(`server is up and listen on ${port}`)
  });
}

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  app: app,
  startup: startup
};