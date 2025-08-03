import { Request, Response, NextFunction } from "express";
import { recipeService } from "./recipe.service.js";
import { AuthenticatedRequest, IdParams } from "../../utils/types.js";
import {
  CreateRecipeInput,
  IRecipe,
  PatchRecipeInput,
} from "./recipe.types.js";
import { IReview } from "../reviews/review.types.js";

const getAllRecipes = async (
  _req: Request,
  res: Response<IRecipe[]>,
  next: NextFunction
) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    return res.status(200).json(recipes);
  } catch (err) {
    return next(err);
  }
};

const getRecipeById = async (
  req: Request<IdParams>,
  res: Response<IRecipe>,
  next: NextFunction
) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    return res.status(200).json(recipe);
  } catch (err) {
    return next(err);
  }
};

const createRecipe = async (
  req: AuthenticatedRequest<{}, {}, CreateRecipeInput>,
  res: Response<IRecipe>,
  next: NextFunction
) => {
  try {
    const newRecipe = await recipeService.createRecipe(req.user!.id, req.body);
    return res.status(201).json(newRecipe);
  } catch (err) {
    return next(err);
  }
};

const updateRecipe = async (
  req: AuthenticatedRequest<IdParams, {}, CreateRecipeInput>,
  res: Response<IRecipe>,
  next: NextFunction
) => {
  try {
    const updatedRecipe = await recipeService.updateRecipe(
      req.params.id,
      req.body
    );
    return res.status(200).json(updatedRecipe);
  } catch (err) {
    return next(err);
  }
};

const patchRecipe = async (
  req: AuthenticatedRequest<IdParams, {}, PatchRecipeInput>,
  res: Response<IRecipe>,
  next: NextFunction
) => {
  try {
    const updatedRecipe = await recipeService.patchRecipe(
      req.params.id,
      req.body
    );
    return res.status(200).json(updatedRecipe);
  } catch (err) {
    return next(err);
  }
};

const deleteRecipe = async (
  req: AuthenticatedRequest<IdParams>,
  res: Response<IRecipe>,
  next: NextFunction
) => {
  try {
    const deletedRecipe = await recipeService.deleteRecipe(req.params.id);
    return res.status(200).json(deletedRecipe);
  } catch (err) {
    return next(err);
  }
};

const getAllReviews = async (
  req: Request<IdParams>,
  res: Response<IReview[]>,
  next: NextFunction
) => {
  try {
    const reviews = await recipeService.getAllReviews(req.params.id);
    return res.status(200).json(reviews);
  } catch (err) {
    return next(err);
  }
};

export const recipeController = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  patchRecipe,
  deleteRecipe,
  getAllReviews,
};
