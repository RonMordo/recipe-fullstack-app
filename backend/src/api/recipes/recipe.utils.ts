import { AppError } from "../../utils/appError.js";
import { CreateRecipeInput } from "./recipe.types.js";

const validateCreateRecipeInput = (recipeData: CreateRecipeInput) => {
  for (const field in recipeData) {
    if (!field) {
      throw new AppError("Missing fields.", 400);
    }
  }
  return true;
};

export const recipeUtils = {
  validateCreateRecipeInput,
};
