import { Router } from "express";
import recipeRouter from "./recipes/recipe.route.js";
import reviewRouter from "./reviews/review.route.js";

const router = Router();

router.use("/recipes", recipeRouter);
router.use("/reviews", reviewRouter);

export default router;
