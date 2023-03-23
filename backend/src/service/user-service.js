import User from "../domain/user.js";
import dateService from "./date-service.js";

const UserService = {
  async createUser(name, email, hashPassword) {
    return User.create({
      name,
      email,
      password: hashPassword,
      lastLoginedAt: dateService.getCurrentDate(),
    });
  },

  async getUserByEmail(email) {
    return User.findOne({
      where: { email },
    });
  },

  async getAllUsers() {
    return User.findAll();
  },

  async deleteUserById(id) {
    return User.destroy({
      where: { id },
    });
  },

  async blockUserById(id) {
    return User.update(
      { status: "Blocked" },
      {
        where: { id },
      }
    );
  },

  async activateUserById(id) {
    return User.update(
      { status: "Active" },
      {
        where: { id },
      }
    );
  },

  getUserPropertyValue(user, property) {
    return user.getDataValue(property);
  },

  async updateUserLastLoginedTimeByEmail(email) {
    return User.update(
      {
        lastLoginedAt: dateService.getCurrentDate(),
      },
      { where: { email } }
    );
  },
};
export default UserService;
