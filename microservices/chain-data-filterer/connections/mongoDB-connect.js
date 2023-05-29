// Bring Mongoose into the app
const mongoose = require('mongoose');
const config = require('../config');
const { logger } = require('../config/logger');

// for db connection strings and settings

// Create the database connection
const db = mongoose.createConnection(config.db.str, config.db.options);
// mongoose.set('debug', true);

// CONNECTION EVENTS

// When successfully connected
db.on('connected', () => {
  logger.info('Mongoose connection open to master DB');
  console.log('1 => conneected');
});

// If the connection throws an error
db.on('error', (err) => {
  logger.error(`Mongoose connection error for master DB: ${err}`);
  console.log('2 => error');
});

// When the connection is disconnected
db.on('disconnected', () => {
  logger.info('Mongoose connection disconnected for master DB');
  console.log('3 => disconnected');
});

// When connection is reconnected
db.on('reconnected', () => {
  logger.info('Mongoose connection reconnected for master DB');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  db.close(() => {
    logger.info(
      'Mongoose connection disconnected for master DB through app termination',
    );
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  });
});

module.exports = { DB: db };
