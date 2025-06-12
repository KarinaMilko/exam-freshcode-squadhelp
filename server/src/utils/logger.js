const path = require('path');
const fs = require('fs').promises;
const { format, createLogger, transports } = require('winston');
const schedule = require('node-schedule');

const { printf } = format;

const logDir = path.resolve(__dirname, '../../logs');

const dailyDir = path.resolve(logDir, 'daily');

const logFilePath = path.resolve(logDir, 'error.log');

(async () => {
  try {
    await fs.mkdir(logDir, { recursive: true });
    await fs.mkdir(dailyDir, { recursive: true });
  } catch (err) {
    console.error('Error creating log directories', err);
  }
})();

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

const errorRotate = async () => {
  try {
    const date = new Date().toISOString().split('T')[0];
    const backupFile = path.join(dailyDir, `error-${date}.log`);

    const data = await fs.readFile(logFilePath, 'utf8');
    if (!data) return;

    const transformedData = data
      .split('\n')
      .filter(line => line.trim())
      .map(transformedFormat)
      .join('\n');

    await fs.appendFile(backupFile, transformedData + '\n');
    await fs.truncate(logFilePath, 0);
  } catch (error) {
    logger.error('Error during log rotation', error);
  }
};

schedule.scheduleJob('0 0 0 * * *', () => {
  errorRotate();
});

module.exports = logger;
