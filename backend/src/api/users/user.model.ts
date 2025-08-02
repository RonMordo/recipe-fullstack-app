import { Schema, Types, model } from "mongoose";
import { UserDocument, IUserModel } from "./user.types.js";

const userSchema = new Schema<UserDocument, IUserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    recipes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Recipe",
          required: true,
        },
      ],
      default: (): Types.ObjectId[] => [],
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

export const UserModel = model<UserDocument, IUserModel>("User", userSchema);
