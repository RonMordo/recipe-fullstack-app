import { userService } from "./user.service.js";
import { CreateUserInput, PatchUserInput, ResponseUser } from "./user.types.js";
import { Request, Response, NextFunction } from "express";
import { IdParams } from "../../utils/types.js";

const getAllUsers = async (
  _req: Request,
  res: Response<ResponseUser[]>,
  next: NextFunction
) => {
  try {
    const users = (await userService.getAllUsers()).map((u) => {
      const { password, ...user } = u.toObject();
      return user;
    });
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

const getUserById = async (
  req: Request<IdParams>,
  res: Response<ResponseUser>,
  next: NextFunction
) => {
  try {
    const { password, ...user } = (
      await userService.getUserById(req.params.id)
    ).toObject();
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

const updateUser = async (
  req: Request<IdParams, {}, CreateUserInput>,
  res: Response<ResponseUser>,
  next: NextFunction
) => {
  try {
    const { password, ...updatedUser } = (
      await userService.updateUser(req.params.id, req.body)
    ).toObject();
    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};

const patchUser = async (
  req: Request<IdParams, {}, PatchUserInput>,
  res: Response<ResponseUser>,
  next: NextFunction
) => {
  try {
    const { password, ...updatedUser } = (
      await userService.patchUser(req.params.id, req.body)
    ).toObject();
    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};

const deleteUser = async (
  req: Request<IdParams>,
  res: Response<ResponseUser>,
  next: NextFunction
) => {
  try {
    const { password, ...deletedUser } = (
      await userService.deleteUser(req.params.id)
    ).toObject();
    return res.status(200).json(deletedUser);
  } catch (err) {
    return next(err);
  }
};

export const userController = {
  getAllUsers,
  getUserById,
  updateUser,
  patchUser,
  deleteUser,
};
