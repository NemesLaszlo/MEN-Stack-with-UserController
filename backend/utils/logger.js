import pkg from 'winston'
const {createLogger,format} = pkg;
import winstonRotator from 'winston-daily-rotate-file'

const myFormat = format.printf(({ message, timestamp }) => {
  return `${timestamp}: ${message}`;
});

  const successTransport = new (winstonRotator)({
    name: 'access-file',
    level: 'info',
    filename: './logs/%DATE%access.log',
    json: false,
    datePattern: 'YYYY-MM-DD-',
    prepend: true,
  });

  const errorTransport = new (winstonRotator)({
    name: 'error-file',
    level: 'error',
    filename: './logs/%DATE%error.log',
    json: false,
    datePattern: 'YYYY-MM-DD-',
    prepend: true,
  });
  
  const successLogger = createLogger({
    format: format.combine(
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.colorize(), 
      myFormat,
    ),
    transports: [
      successTransport
    ]
  });
  
  const errorLogger = createLogger({
    format: format.combine(
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.colorize(), 
      myFormat,
    ),
    transports: [
      errorTransport
    ]
  }); 


export {successLogger, errorLogger}