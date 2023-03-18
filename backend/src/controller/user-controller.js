import ApiError from "../error/api-error.js";
import User from "../domain/user.js";

class UserController {
  async getAll(request, response, next) {
    const users = await User.findAll();
    if (!users) {
      return next(ApiError.internal("Failed to get user data"));
    }
    return response.json(users);
  }

  async deleteById(request, response, next) {
    const { id } = request.body;
    const deletedCount = await User.destroy({
      where: { id },
    });
    if (!deletedCount) {
      return next(ApiError.badRequest("Failed to delete user"));
    }
    return response.json(deletedCount);
  }

  async blockById(request, response, next) {
    const { id } = request.body;
    const blockedCount = await User.update(
      { status: "Blocked" },
      {
        where: { id },
      }
    );
    if (!blockedCount) {
      return next(ApiError.badRequest("Failed to block user"));
    }
    return response.json(blockedCount);
  }

  async activateById(request, response, next) {
    const { id } = request.body;
    const activatedCount = await User.update(
      { status: "Active" },
      {
        where: { id },
      }
    );
    if (!activatedCount) {
      return next(ApiError.badRequest("Failed to activate user"));
    }
    return response.json(activatedCount);
  }
}

export default new UserController();
