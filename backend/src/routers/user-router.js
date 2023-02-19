import Router from "express";
import userController from "../controllers/user-controller.js";
import authController from "../controllers/auth-controller.js";
import authMiddleware from "../middleware/authorization.js";

const router = new Router();

router.post("/singUp", authController.singUp);
router.post("/singIn", authController.singIn);
router.get("/auth", authMiddleware, authController.getToken);
router.get("/getAll", userController.getAll);
router.post("/delete", userController.deleteById);
router.post("/block", userController.blockById);
router.post("/activate", userController.activateById);

export default router;
