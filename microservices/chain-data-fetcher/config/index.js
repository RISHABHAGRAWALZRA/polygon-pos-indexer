const { config } = require('dotenv');

config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: process.env.PORT || 3000,
  ALCHEMY_RPC_NODE_URL: 'wss://polygon-mainnet.g.alchemy.com/v2/' + process.env.ALCHEMY_API_KEY,

  logConfig: {
    logFolder: './/logs//',
    logFile: 'NodeWinstonApp-%DATE%.log',
  },
};
