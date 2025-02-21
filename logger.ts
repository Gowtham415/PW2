import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';


const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}] ${message}`;
        })
    ),
    transports: [
        new transports.DailyRotateFile({
            filename: 'logs/application-%DATE%.log', // Log file name with date pattern
            datePattern: 'YYYY-MM-DD', // Rotate daily
            maxSize: '20m', // Maximum file size before rotation
            maxFiles: '14d', // Keep logs for 14 days
            zippedArchive: true // Optional: compress rotated files
        }),
        new transports.Console()
    ],
});

export default logger
