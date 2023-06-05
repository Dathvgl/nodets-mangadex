import { Router } from "express";
import { authProtect } from "middlewares/authMiddleware";
import { UserController } from "./userController";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router
  .route("/profile")
  .get(authProtect, UserController.getProfile)
  .put(authProtect, UserController.putProfile);

export default router;
