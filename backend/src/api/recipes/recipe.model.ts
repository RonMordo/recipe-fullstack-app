import { Schema, Types, model } from "mongoose";
import { RecipeDocument, IRecipeModel } from "./recipe.types.js";

const recipeSchema = new Schema<RecipeDocument, IRecipeModel>(
  {
    imgSrc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    reviews: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Review",
          required: true,
        },
      ],
      default: (): Types.ObjectId[] => [],
    },
  },
  {
    timestamps: true,
  }
);

export const RecipeModel = model<RecipeDocument, IRecipeModel>(
  "Recipe",
  recipeSchema
);
