const path = require('path');
const fs = require('fs');
const { format, createLogger, transports } = require('winston');
const schedule = require('node-schedule');

const { printf } = format;

const logDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyDir = path.resolve(logDir, 'daily');
if (!fs.existsSync(dailyDir)) {
  fs.mkdirSync(dailyDir);
}

const logFilePath = path.resolve(logDir, 'error.log');

const customFormat = printf(({ timestamp, code, message, stack }) => {
  return JSON.stringify({
    message,
    time: timestamp ? new Date(timestamp).getTime() : Date.now(),
    code: code || 500,
    stackTrace: stack || {},
  });
});

const transformedFormat = data => {
  try {
    const parsed = JSON.parse(data);
    return JSON.stringify({
      message: parsed.message,
      code: parsed.code || 500,
      time: parsed.time,
    });
  } catch (error) {
    return data;
  }
};

const currentLogTransport = new transports.File({
  level: 'error',
  filename: logFilePath,
  format: customFormat,
});

const logger = createLogger({
  level: 'error',
  transports: [currentLogTransport],
});

const errorRotate = () => {
  const date = new Date().toISOString().split('T')[0];
  const backupFile = path.join(dailyDir, `error-${date}.log`);

  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err || !data) return;

    const transformedData = data
      .split('\n')
      .filter(line => line.trim())
      .map(transformedFormat)
      .join('\n');

    fs.appendFile(backupFile, transformedData + '\n', appendErr => {
      if (appendErr)
        return logger.error('Error writing to rotation file', appendErr);

      fs.truncate(logFilePath, 0, truncateErr => {
        if (truncateErr) logger.error('Error clearing error.log', truncateErr);
      });
    });
  });
};

schedule.scheduleJob('0 0 0 * * * ', () => {
  errorRotate();
});

module.exports = logger;
