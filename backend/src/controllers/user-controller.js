const ApiError = require("../error/api-error");
const User = require("../entities/user");

class UserController {
  async getAll(req, res, next) {
    const users = await User.findAll();
    if (!users) {
      return next(ApiError.internal("Failed to get user data"));
    }
    return res.json(users);
  }

  async deleteById(req, res, next) {
    const { id } = req.body;
    const deletedCount = await User.destroy({
      where: { id },
    });
    if (!deletedCount) {
      return next(ApiError.badRequest("Failed to delete user"));
    }
    return res.json(deletedCount);
  }

  async blockById(req, res, next) {
    const { id } = req.body;
    const blockedCount = await User.update(
      { status: "Blocked" },
      {
        where: { id },
      }
    );
    if (!blockedCount) {
      return next(ApiError.badRequest("Failed to block user"));
    }
    return res.json(blockedCount);
  }

  async activateById(req, res, next) {
    const { id } = req.body;
    const activatedCount = await User.update(
      { status: "Active" },
      {
        where: { id },
      }
    );
    if (!activatedCount) {
      return next(ApiError.badRequest("Failed to activate user"));
    }
    return res.json(activatedCount);
  }
}

module.exports = new UserController();
