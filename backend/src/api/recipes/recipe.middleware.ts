import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/appError.js";
import { Types } from "mongoose";

const validateCreateRecipeInput = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const {
    imgSrc,
    title,
    ingredients,
    instructions,
    description,
    creator,
    reviews,
  } = req.body;

  if (
    typeof imgSrc !== "string" ||
    typeof title !== "string" ||
    !(
      Array.isArray(ingredients) &&
      ingredients.every((ing) => typeof ing === "string")
    ) ||
    typeof instructions !== "string" ||
    typeof description !== "string" ||
    !Types.ObjectId.isValid(creator) ||
    !(
      Array.isArray(reviews) &&
      reviews.every((rev) => Types.ObjectId.isValid(rev))
    )
  ) {
    return next(new AppError("Invalid or missing fields.", 400));
  }
  return next();
};

export const recipeMiddleware = { validateCreateRecipeInput };
