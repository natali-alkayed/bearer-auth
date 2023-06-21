'use strict';

// Start up DB Server
const { db } = require('./src/auth/models/index.js');
db.sync()
  .then(() => {

    // Start the web server
    require('./src/server.js').startup(process.env.PORT);
  }).catch(error => {
    console.error('Error occurred during synchronization or database connection:', error);
    process.exit(1); // Optional: Exit the process to indicate a failure
  });

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
  // You can add additional error handling or logging here if needed
});