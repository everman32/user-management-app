import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";
import User from "../domain/user.js";
import ApiError from "../error/api-error.js";

const generateJwt = (id, email) =>
  jwt.sign({ id, email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });

class AuthController {
  getToken(request, response) {
    const token = generateJwt(request.user.id, request.user.email);
    return response.json({ token });
  }

  async singUp(request, response, next) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return next(ApiError.badRequest("Incorrect data"));
    }

    const candidate = await User.findOne({
      where: { email },
    });
    if (candidate) {
      return next(ApiError.badRequest("User with this email already exists"));
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      lastLoginedAt: moment().format("YYYY-MM-DD h:mm:ss"),
    });

    const token = generateJwt(user.id, user.email);
    return response.json({ token });
  }

  async singIn(request, response, next) {
    const { email, password } = request.body;

    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return next(ApiError.internal("User with this email does not exist"));
    }

    const status = user.getDataValue("status");
    if (status === "Blocked") {
      return next(ApiError.internal("User is blocked"));
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return next(ApiError.internal("Password is not valid"));
    }

    const token = generateJwt(user.id, user.email);

    const updatedLastLoginedTime = await User.update(
      {
        lastLoginedAt: moment().format("YYYY-MM-DD h:mm:ss"),
      },
      { where: { email } }
    );
    if (!updatedLastLoginedTime) {
      return next(ApiError.internal("Failed to add last login date"));
    }

    return response.json({ token });
  }
}

export default new AuthController();
