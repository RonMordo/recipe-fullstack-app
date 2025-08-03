import { HydratedDocument, Model } from "mongoose";
import { IRecipe } from "../recipes/recipe.types.js";
import { IReview } from "../reviews/review.types.js";

export interface IUser {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserInput = Pick<IUser, "email" | "name" | "password">;
export type PatchUserInput = Partial<CreateUserInput>;

// Response
export type ResponseUser = Omit<IUser, "password"> & {
  recipes?: IRecipe[];
  reviews?: IReview[];
};

// Mongo types/interfaces
export type UserDocument = HydratedDocument<IUser>;

export interface IUserModel extends Model<UserDocument> {}
