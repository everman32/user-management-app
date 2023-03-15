import pino, { stdTimeFunctions } from "pino";
import path from "node:path";
import fs from "node:fs";

const logDirectory = path.join(
  process.cwd(),
  process.env.PINO_LOG_DIRECTORY || "logs"
);
fs.mkdirSync(logDirectory, { recursive: true });
const logFile = path.join(logDirectory, process.env.PINO_LOG_FILE || "app.log");

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
