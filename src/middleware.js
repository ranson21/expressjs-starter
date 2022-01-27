// External Deendencies
import { createLogger, format, transports } from "winston";
import expressWinston from "express-winston";

/**
 * CreateLogger -- Creates the winston logger connected to Stackdriver logging
 * @returns {Object} -- The Stackdriver-connected Winston application logger
 */
export const newLogger = () => {
  const setTransports = () => {
    // Setup the log transport defaulting to Console only
    const transportList = [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.simple()
        )
      })
    ];

    // Return the list of locations to log into
    return transportList;
  };

  const logger = createLogger({
    level: "info",
    format: format.combine(format.timestamp(), format.simple()),
    transports: setTransports()
  });

  // Return the logger
  return expressWinston.logger(logger);
};
