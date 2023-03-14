import ApiError from "../error/api-error.js";

const errorMiddleware = (error, _request, response, _next) => {
  if (error instanceof ApiError) {
    return response.status(error.status).json({ message: error.message });
  }
  return response.status(500).json({ message: "unexpected error" });
};

export default errorMiddleware;
