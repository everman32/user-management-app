import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routers/main-router.js";
import sequelize from "./config/database-connection.js";
import logger from "./config/logger.js";
import accessLogger from "./middleware/access-logger.js";
import errorMiddleware from "./middleware/error-middleware.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(accessLogger);
app.use(express.json());
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
  } catch (error) {
    logger.error(error);
  }
};

await start();
