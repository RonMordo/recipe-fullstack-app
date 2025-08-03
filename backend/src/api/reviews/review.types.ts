import { Types, HydratedDocument, Model } from "mongoose";

export interface IReview {
  reviewer: Types.ObjectId;
  recipe: Types.ObjectId;
  rating: 1 | 2 | 3 | 4 | 5;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateReviewInput = Pick<IReview, "recipe" | "rating" | "content">;

export type PatchReviewInput = Partial<CreateReviewInput>;

// Mongo types/interfaces
export type ReviewDocument = HydratedDocument<IReview>;

export interface IReviewModel extends Model<ReviewDocument> {}
