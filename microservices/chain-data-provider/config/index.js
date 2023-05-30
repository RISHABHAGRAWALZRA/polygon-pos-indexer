const { config } = require('dotenv');

config();

module.exports = {
  db: {
    str: 'mongodb://mongo:27017/polygon-pos-indexer',
    options: {
      useNewUrlParser: true,
      readPreference: 'primaryPreferred',
      useUnifiedTopology: true,
    },
  },
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: process.env.PORT || 7000,

  logConfig: {
    logFolder: './/logs//',
    logFile: 'NodeWinstonApp-%DATE%.log',
  },
};
