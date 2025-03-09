const { format, createLogger, transports } = require('winston');
const path = require('path');

const { printf, timestamp, combine, errors } = format;

const logFilePath = path.resolve(__dirname, '../../logs/error.log');

const customFormat = printf(({ timestamp, code, message, stack }) => {
  return JSON.stringify({
    message,
    time: new Date(timestamp).getTime(),
    code: code || 500,
    stackTrace: stack || {},
  });
});

const logger = createLogger({
  level: 'error',
  format: combine(timestamp(), errors({ stack: true }), customFormat),
  transports: [
    new transports.File({
      filename: logFilePath,
    }),
  ],
});

logger.error('Тестова помилка');

module.exports = logger;
