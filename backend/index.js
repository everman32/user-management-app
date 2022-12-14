require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database-connection");
const router = require("./routers/main-router");
const errorHandler = require("./middleware/error-handling");

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
  } catch (e) {
    console.log(e);
  }
};

start();
