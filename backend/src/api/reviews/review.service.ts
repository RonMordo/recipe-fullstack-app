import { ReviewModel } from "./review.model.js";
import { AppError } from "../../utils/appError.js";
import { CreateReviewInput, PatchReviewInput } from "./review.types.js";

const getAllReviews = () => {
  return ReviewModel.find();
};

const getReviewById = async (id: string) => {
  const review = await ReviewModel.findById(id);
  if (!review) {
    throw new AppError(`Review with ID: ${id} not found.`, 404);
  }
  return review;
};

const createReview = async (reviewData: CreateReviewInput) => {
  const newReview = await ReviewModel.create(reviewData);
  return newReview.save();
};

const updateReview = async (id: string, reviewData: CreateReviewInput) => {
  const reviewToUpdate = await getReviewById(id);
  Object.assign(reviewToUpdate, reviewData);
  return reviewToUpdate.save();
};

const patchReview = async (id: string, reviewData: PatchReviewInput) => {
  const updatedReview = await ReviewModel.findByIdAndUpdate(id, reviewData, {
    runValidators: true,
    new: true,
  });
  if (!updatedReview) {
    throw new AppError(`Review with ID: ${id} not found.`, 404);
  }
  return updatedReview;
};

const deleteReview = async (id: string) => {
  const deletedReview = await ReviewModel.findByIdAndDelete(id);
  if (!deletedReview) {
    throw new AppError(`Review with ID: ${id} not found.`, 404);
  }
  return deletedReview;
};

export const reviewService = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  patchReview,
  deleteReview,
};
