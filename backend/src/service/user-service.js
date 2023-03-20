import moment from "moment";
import User from "../domain/user.js";

class UserService {
  async createUser(name, email, hashPassword) {
    return User.create({
      name,
      email,
      password: hashPassword,
      lastLoginedAt: moment().format("YYYY-MM-DD h:mm:ss"),
    });
  }

  async getUserByEmail(email) {
    return User.findOne({
      where: { email },
    });
  }

  async getAllUsers() {
    return User.findAll();
  }

  async deleteUserById(id) {
    return User.destroy({
      where: { id },
    });
  }

  async blockUserById(id) {
    return User.update(
      { status: "Blocked" },
      {
        where: { id },
      }
    );
  }

  async activateUserById(id) {
    return User.update(
      { status: "Active" },
      {
        where: { id },
      }
    );
  }

  getUserPropertyValue(user, property) {
    return user.getDataValue(property);
  }

  async updateUserLastLoginedTimeByEmail(email) {
    return User.update(
      {
        lastLoginedAt: moment().format("YYYY-MM-DD h:mm:ss"),
      },
      { where: { email } }
    );
  }
}
export default new UserService();
