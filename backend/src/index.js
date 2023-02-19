import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routers/main-router.js";
import sequelize from "./config/database-connection.js";
import errorHandler from "./middleware/error-handling.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
