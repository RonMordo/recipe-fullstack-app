import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";
import { Types } from "mongoose";

const validateIdParams = (req: Request, _res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return next(new AppError(`ID: ${id} is invalid format.`, 400));
  }
  return next();
};

export const globalMiddlewares = { validateIdParams };
