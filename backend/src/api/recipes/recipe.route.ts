import { Router } from "express";
import { recipeController } from "./recipe.controller.js";
import { globalMiddlewares } from "../../middlewares/validation.js";
import { recipeMiddleware } from "./recipe.middleware.js";

const router = Router();

router.get("/", recipeController.getAllRecipes);
router.get(
  "/:id",
  globalMiddlewares.validateIdParams,
  recipeController.getRecipeById
);
router.post(
  "/",
  recipeMiddleware.validateCreateRecipeInput,
  recipeController.createRecipe
);
router.put(
  "/:id",
  recipeMiddleware.validateCreateRecipeInput,
  recipeController.updateRecipe
);
router.patch("/:id", recipeController.patchRecipe);
router.delete("/:id", recipeController.deleteRecipe);

export default router;
