import { Router } from "express";
import recipeRouter from "./recipes/recipe.route.js";

const router = Router();

router.use("/recipes", recipeRouter);

export default router;
