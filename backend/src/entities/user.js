import { DataTypes } from "sequelize";
import moment from "moment";
import sequelize from "../config/database-connection.js";

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
        return moment(this.getDataValue("lastLoginedAt")).format(
          "YYYY-MM-DD h:mm:ss"
        );
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue("createdAt")).format(
          "YYYY-MM-DD h:mm:ss"
        );
      },
    },
  },
  {
    updatedAt: false,
  }
);

export default User;
