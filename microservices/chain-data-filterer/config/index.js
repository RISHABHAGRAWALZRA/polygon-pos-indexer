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
  ALCHEMY_RPC_NODE_URL: 'wss://matic.getblock.io/' + process.env.GET_BLOCK_API_KEY + '/mainnet/',
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: process.env.PORT || 5000,

  logConfig: {
    logFolder: './/logs//',
    logFile: 'NodeWinstonApp-%DATE%.log',
  },
};
