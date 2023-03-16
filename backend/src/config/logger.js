import pino, { stdTimeFunctions } from "pino";
import path from "node:path";
import logDirectory from "./log-directory.js";

const logFile = path.join(
  logDirectory,
  process.env.PINO_LOG_FILE || "server.log"
);

const logger = pino({
  level: process.env.PINO_LOG_LEVEL || "info",
  timestamp: stdTimeFunctions.isoTime,
  transport: {
    targets: [
      {
        target: "pino/file",
        options: {
          destination: logFile,
        },
      },
      {
        target: "pino/file",
      },
    ],
  },
});

export default logger;
