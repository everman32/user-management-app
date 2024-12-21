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
        const lastLoginedAt = this.getDataValue("lastLoginedAt");
        return lastLoginedAt
          ? dateService.getFormatedDate(lastLoginedAt)
          : undefined;
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        const createdAt = this.getDataValue("createdAt");
        return createdAt ? dateService.getFormatedDate(createdAt) : undefined;
      },
    },
  },
  {
    updatedAt: false,
  }
);

export default User;
