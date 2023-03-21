import ApiError from "../error/api-error.js";

const errorHandler = (err, _req, res, _next) => {
  try {
    if (err instanceof ApiError) {
      return res.status(err.status).json({ message: err.message });
    }
    throw new Error("Unexpected error");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default errorHandler;
