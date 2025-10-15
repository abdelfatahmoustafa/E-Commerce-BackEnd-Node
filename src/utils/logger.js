import winston, { transports } from "winston";

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const logger = winston.createLogger({
  levels: logLevels,
  level: process.env.LOG_LEVEL || "info",

  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
      const metaStr = Object.keys(meta).length
        ? ` ${JSON.stringify(meta)}`
        : "";
      return stack
        ? `${timestamp} ${level}: ${message}\n${stack}${metaStr}`
        : `${timestamp} ${level}: ${message}${metaStr}`;
    })
  ),

  transports: [
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.json()
      ),
    }),
    new transports.File({
      filename: "logs/warn.log",
      level: "warn",
      format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.json()
      ),
    }),
    new transports.File({
      filename: "logs/info.log",
      level: "info",
      format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.json()
      ),
    }),
    new transports.File({
      filename: "logs/debug.log",
      level: "debug",
      format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.json()
      ),
    }),
    new transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
        winston.format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} ${level}: ${message}`
        )
      ),
    }),
  ],
});

export default logger;
