import { Router } from "express";
import { userController } from "./user.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.get(
  "/recipes",
  authMiddleware.authenticate,
  userController.getAllRecipes
);
router.get(
  "/reviews",
  authMiddleware.authenticate,
  userController.getAllReviews
);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.patch("/:id", userController.patchUser);
router.delete("/:id", userController.deleteUser);

export default router;
