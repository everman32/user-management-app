import os from "node:os";
import fs from "node:fs/promises";
import path from "node:path";

const logDirectory = path.join(
  os.homedir(),
  process.env.PINO_LOG_DIRECTORY || "user-management-app"
);

const createLogDirectoryIfNotExist = async () => {
  try {
    await fs.mkdir(logDirectory, { recursive: true });
  } catch (error) {
    throw new Error(`Error creating log directory: ${error.message}`);
  }
};

await createLogDirectoryIfNotExist();

export default logDirectory;
