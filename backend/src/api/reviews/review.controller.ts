import { reviewService } from "./review.service.js";
import { Request, Response, NextFunction } from "express";
import {
  CreateReviewInput,
  IReview,
  PatchReviewInput,
} from "./review.types.js";
import { IdParams } from "../../utils/types.js";

const getAllReviews = async (
  _req: Request,
  res: Response<IReview[]>,
  next: NextFunction
) => {
  try {
    const reviews = await reviewService.getAllReviews();
    return res.status(200).json(reviews);
  } catch (err) {
    return next(err);
  }
};
const getReviewById = async (
  req: Request<IdParams>,
  res: Response<IReview>,
  next: NextFunction
) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);
    return res.status(200).json(review);
  } catch (err) {
    return next(err);
  }
};
const createReview = async (
  req: Request<{}, {}, CreateReviewInput>,
  res: Response<IReview>,
  next: NextFunction
) => {
  try {
    const newReview = await reviewService.createReview(req.body);
    return res.status(201).json(newReview);
  } catch (err) {
    return next(err);
  }
};
const updateReview = async (
  req: Request<IdParams, {}, CreateReviewInput>,
  res: Response<IReview>,
  next: NextFunction
) => {
  try {
    const updatedReview = await reviewService.updateReview(
      req.params.id,
      req.body
    );
    return res.status(200).json(updatedReview);
  } catch (err) {
    return next(err);
  }
};
const patchReview = async (
  req: Request<IdParams, {}, PatchReviewInput>,
  res: Response<IReview>,
  next: NextFunction
) => {
  try {
    const updatedReview = await reviewService.patchReview(
      req.params.id,
      req.body
    );
    return res.status(200).json(updatedReview);
  } catch (err) {
    return next(err);
  }
};
const deleteReview = async (
  req: Request<IdParams>,
  res: Response<IReview>,
  next: NextFunction
) => {
  try {
    const deletedReview = await reviewService.deleteReview(req.params.id);
    return res.status(200).json(deletedReview);
  } catch (err) {
    return next(err);
  }
};

export const reviewController = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  patchReview,
  deleteReview,
};
