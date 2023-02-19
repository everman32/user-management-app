import ApiError from "../error/api-error.js";

export default function (error, request, response, next) {
  if (error instanceof ApiError) {
    return response.status(error.status).json({ message: error.message });
  }
  return response.status(500).json({ message: "unexpected error" });
}
