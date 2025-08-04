import { Router } from "express";
import { userController } from "./user.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { userValidationSchema } from "./user.schema.js";
import { globalValidationSchemas } from "../../validationSchemas.ts/globalValidation.schema.js";

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

router.get(
  "/:id",
  validate(globalValidationSchemas.getByIdSchema),
  userController.getUserById
);

router.put(
  "/:id",
  authMiddleware.authenticate,
  validate(userValidationSchema.updateUserSchema),
  userController.updateUser
);

router.patch(
  "/:id",
  authMiddleware.authenticate,
  validate(userValidationSchema.patchUserSchema),
  userController.patchUser
);

router.delete(
  "/:id",
  authMiddleware.authenticate,
  validate(globalValidationSchemas.getByIdSchema),
  userController.deleteUser
);

export default router;
