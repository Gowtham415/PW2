import { createLogger, format, transports } from 'winston';
import { DateUtils } from './helpers/dateHelper';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}] ${message}`;
        })
    ),
    transports: [
        new transports.Console(), 
        new transports.File({ filename: `logs/playwright-test-${DateUtils.currentDateTimeStamp}.log` }) 
    ],
});

export default logger
