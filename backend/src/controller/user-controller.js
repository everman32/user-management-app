import ApiError from "../error/api-error.js";
import userService from "../service/user-service.js";

const UserController = {
  async getAllUsers(_req, res, next) {
    const users = await userService.getAllUsers();
    if (!users) {
      return next(ApiError.internal("Failed to get user data"));
    }
    return res.json(users);
  },

  async deleteUser(req, res, next) {
    const { id } = req.body;
    const deletedCount = await userService.deleteUserById(id);
    if (!deletedCount) {
      return next(ApiError.badRequest("Failed to delete user"));
    }
    return res.json(deletedCount);
  },

  async blockUser(req, res, next) {
    const { id } = req.body;
    const blockedCount = await userService.blockUserById(id);
    if (!blockedCount) {
      return next(ApiError.badRequest("Failed to block user"));
    }
    return res.json(blockedCount);
  },

  async activateUser(req, res, next) {
    const { id } = req.body;
    const activatedCount = userService.activateUserById(id);
    if (!activatedCount) {
      return next(ApiError.badRequest("Failed to activate user"));
    }
    return res.json(activatedCount);
  },
};

export default UserController;
