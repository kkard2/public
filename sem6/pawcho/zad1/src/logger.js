import { createLogger, format, transports } from 'winston';

const myFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export default createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        myFormat
    ),
    defaultMeta: { service: 'zad1' },
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
        new transports.Console()
    ]
});
