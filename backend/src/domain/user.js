import { DataTypes } from "sequelize";
import sequelize from "../config/database-connection.js";
import dateService from "../service/date-service.js";

const User = sequelize.define(
  "users",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM("Active", "Blocked"),
      defaultValue: "Active",
    },
    lastLoginedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return dateService.getFormatedDate(this.getDataValue("lastLoginedAt"));
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return dateService.getFormatedDate(this.getDataValue("createdAt"));
      },
    },
  },
  {
    updatedAt: false,
  }
);

export default User;
