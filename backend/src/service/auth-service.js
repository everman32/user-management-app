import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AuthService = {
  generateJwt(id, email) {
    return jwt.sign({ id, email }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
  },

  async hashPassword(password, length) {
    return bcrypt.hash(password, length);
  },

  async verifyPassword(verifiablePassword, truePassword) {
    return bcrypt.compare(verifiablePassword, truePassword);
  },
};

export default AuthService;
