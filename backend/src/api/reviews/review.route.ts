import { Router } from "express";
import { reviewController } from "./review.controller.js";
import { authMiddleware } from "../auth/auth.middleware.js";

const router = Router();

router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getReviewById);

// Protected
router.use(authMiddleware.authenticate);
router.post("/", reviewController.createReview);
router.put("/:id", reviewController.updateReview);
router.patch("/:id", reviewController.patchReview);
router.delete("/:id", reviewController.deleteReview);

export default router;
