import { Router } from "express";
import { reviewController } from "./review.controller.js";

const router = Router();

router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getReviewById);
router.post("/", reviewController.createReview);
router.put("/:id", reviewController.updateReview);
router.patch("/:id", reviewController.patchReview);
router.delete("/:id", reviewController.deleteReview);

export default router;
