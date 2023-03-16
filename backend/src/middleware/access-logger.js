import pino, { stdTimeFunctions } from "pino";
import pinoHttp from "pino-http";
import path from "node:path";
import logDirectory from "../config/log-directory.js";

const logFile = path.join(
  logDirectory,
  process.env.PINO_ACCESS_LOG_FILE || "access.log"
);

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  timestamp: stdTimeFunctions.isoTime,
  redact: {
    paths: ["req.headers.authorization"],
    censor: "*****",
  },
  transport: {
    target: "pino/file",
    options: {
      destination: logFile,
    },
  },
});

const accessLogger = pinoHttp({
  logger,
  name: "http",
  serializers: {
    req: pinoHttp.stdSerializers.req,
    res: pinoHttp.stdSerializers.res,
  },
  customLogLevel: (res, err) => {
    if (res.statusCode >= 500 || err) {
      return "error";
    }
    return "info";
  },
});

export default accessLogger;
