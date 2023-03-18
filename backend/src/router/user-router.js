import Router from "express";
import userController from "../controller/user-controller.js";
import authController from "../controller/auth-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = new Router();

router.post("/singUp", authController.singUp);
router.post("/singIn", authController.singIn);
router.get("/auth", authMiddleware, authController.getToken);
router.get("/getAll", userController.getAll);
router.post("/delete", userController.deleteById);
router.post("/block", userController.blockById);
router.post("/activate", userController.activateById);

export default router;
