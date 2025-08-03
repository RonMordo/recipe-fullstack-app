import { Types, HydratedDocument, Model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  name: string;
  recipes: Types.ObjectId[];
  reviews: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserInput = Pick<IUser, "email" | "name" | "password"> &
  Partial<Pick<IUser, "recipes" | "reviews">>;

export type PatchUserInput = Partial<CreateUserInput>;

// Response
export type ResponseUser = Omit<IUser, "password">;

// Mongo types/interfaces
export type UserDocument = HydratedDocument<IUser>;

export interface IUserModel extends Model<UserDocument> {}
