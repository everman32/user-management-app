import ApiError from "../error/api-error.js";
import authService from "../service/auth-service.js";
import userService from "../service/user-service.js";

const AuthController = {
  getToken(req, res) {
    const token = authService.generateJwt(req.user.id, req.user.email);
    return res.json({ token });
  },

  async singIn(req, res, next) {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return next(ApiError.internal("User with this email does not exist"));
    }

    const status = userService.getUserPropertyValue(user, "status");
    if (status === "Blocked") {
      return next(ApiError.internal("User is blocked"));
    }

    const isValidPassword = await authService.verifyPassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      return next(ApiError.internal("Password is not valid"));
    }

    const token = authService.generateJwt(user.id, user.email);

    const updatedLastLoginedTime =
      await userService.updateUserLastLoginedTimeByEmail(email);
    if (!updatedLastLoginedTime) {
      return next(ApiError.internal("Failed to add last login date"));
    }

    return res.json({ token });
  },

  async singUp(req, res, next) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(ApiError.badRequest("Incorrect data"));
    }

    const candidate = await userService.getUserByEmail(email);
    if (candidate) {
      return next(ApiError.badRequest("User with this email already exists"));
    }

    const hashPassword = await authService.hashPassword(password, 5);

    const user = await userService.createUser(name, email, hashPassword);

    const token = authService.generateJwt(user.id, user.email);
    return res.json({ token });
  },
};

export default AuthController;
