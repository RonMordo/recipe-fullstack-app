import { Router } from "express";
import { recipeController } from "./recipe.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { reviewValidationSchema } from "../reviews/review.schema.js";

const router = Router();

router.get("/", recipeController.getAllRecipes);
router.get("/:id/reviews", recipeController.getAllReviews);
router.get("/:id", recipeController.getRecipeById);

// Protected
router.use(authMiddleware.authenticate);
router.post(
  "/:id/reviews",
  validate(reviewValidationSchema.createReviewSchema),
  recipeController.createReview
);
router.post("/", recipeController.createRecipe);
router.put("/:id", recipeController.updateRecipe);
router.patch("/:id", recipeController.patchRecipe);
router.delete("/:id", recipeController.deleteRecipe);

export default router;
