import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routers/main-router.js";
import sequelize from "./config/database-connection.js";
import logger from "./config/logger.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

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
