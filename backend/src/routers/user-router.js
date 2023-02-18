const Router = require("express");

const router = new Router();
const userController = require("../controllers/user-controller");
const authController = require("../controllers/auth-controller");
const authMiddleware = require("../middleware/authorization");

router.post("/singUp", authController.singUp);
router.post("/singIn", authController.singIn);
router.get("/auth", authMiddleware, authController.getToken);
router.get("/getAll", userController.getAll);
router.post("/delete", userController.deleteById);
router.post("/block", userController.blockById);
router.post("/activate", userController.activateById);

module.exports = router;
