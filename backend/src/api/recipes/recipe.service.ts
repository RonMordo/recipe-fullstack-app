import { RecipeModel } from "./recipe.model.js";
import { AppError } from "../../utils/appError.js";
import { CreateRecipeInput, PatchRecipeInput } from "./recipe.types.js";

// Add business logic validation with zod

const getAllRecipes = async () => {
  return RecipeModel.find();
};

const getRecipeById = async (id: string) => {
  const recipe = await RecipeModel.findById(id);
  if (!recipe) {
    throw new AppError(`Recipe with ID: ${id} not found.`, 404);
  }
  return recipe;
};

const createRecipe = async (recipeData: CreateRecipeInput) => {
  const newRecipe = await RecipeModel.create(recipeData);
  return newRecipe.save();
};

const updateRecipe = async (id: string, recipeData: CreateRecipeInput) => {
  const recipeToUpdate = await getRecipeById(id);
  Object.assign(recipeToUpdate, recipeData);
  return recipeToUpdate.save();
};

const patchRecipe = async (id: string, recipeData: PatchRecipeInput) => {
  const updatedRecipe = await RecipeModel.findByIdAndUpdate(id, recipeData, {
    runValidators: true,
    new: true,
  });
  if (!updatedRecipe) {
    throw new AppError(`Recipe with ID: ${id} not found.`, 404);
  }
  return updatedRecipe;
};

const deleteRecipe = async (id: string) => {
  const deletedRecipe = await RecipeModel.findByIdAndDelete(id);
  if (!deletedRecipe) {
    throw new AppError(`Recipe with ID: ${id} not found.`, 404);
  }
  return deletedRecipe;
};

export const recipeService = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  patchRecipe,
  deleteRecipe,
};
