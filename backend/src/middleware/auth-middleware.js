import { verify } from "jsonwebtoken";

const authMiddleware = (request, response, next) => {
  if (request.method === "OPTIONS") {
    next();
  }
  try {
    const token = request.headers.authorization.split(" ")[1];
    if (!token) {
      return response.status(401).json({ message: "not authorized" });
    }
    const decoded = verify(token, process.env.SECRET_KEY);
    request.user = decoded;
    next();
  } catch {
    response.status(401).json({ message: "not authorized" });
  }
  return 0;
};

export default authMiddleware;
