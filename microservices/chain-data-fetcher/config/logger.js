const winston = require('winston');

const config = require('.');

// const fs = require('fs')
const DailyRotateFile = require('winston-daily-rotate-file');

// const tsFormat = () => moment().format('YYYY-MM-DD hh:mm:ss')
const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.errors({ stack: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const transport = new DailyRotateFile({
  filename: config.logConfig.logFolder + config.logConfig.logFile,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  prepend: true,
});

module.exports.logger = winston.createLogger({
  format: logFormat,
  transports: [
    transport,
    // new winston.transports.Console({ level: 'info' })
  ],
});


