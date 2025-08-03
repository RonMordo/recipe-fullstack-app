import { Types, HydratedDocument, Model } from "mongoose";

export interface IRecipe {
  imgSrc: string;
  title: string;
  ingredients: string[];
  instructions: string;
  description: string;
  creator: Types.ObjectId;
  category: "kosher" | "vegan" | "vegetarian" | "meat-based" | "gluten-free";
  preparationTime: 1 | 2 | 3 | 4;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateRecipeInput = Omit<
  IRecipe,
  "createdAt" | "updatedAt" | "creator"
>;

export type PatchRecipeInput = Partial<CreateRecipeInput>;

// Mongo types/interfaces
export type RecipeDocument = HydratedDocument<IRecipe>;

export interface IRecipeModel extends Model<RecipeDocument> {}
