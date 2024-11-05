const winston = require('winston');

// Create a custom logger
const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.combine(
    winston.format.colorize(), 
    winston.format.timestamp(), 
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] : ${message}`; 
    })
  ),
  transports: [
    // Console transport (for development)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),

    // File transport (for production or persistent logs)
    new winston.transports.File({
      filename: 'logs/app.log',
      level: 'info', 
    }),

  ],
});

module.exports = logger;
