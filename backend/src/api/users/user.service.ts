import { UserModel } from "./user.model.js";
import { AppError } from "../../utils/appError.js";
import { CreateUserInput, PatchUserInput } from "./user.types.js";
import { authService } from "../auth/auth.service.js";

const getAllUsers = () => {
  return UserModel.find();
};

const getUserById = async (id: string) => {
  const recipe = await UserModel.findById(id);
  if (!recipe) {
    throw new AppError(`User with ID: ${id} not found.`, 404);
  }
  return recipe;
};

const getUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError("Invalid credentials.", 400);
  }
  return user;
};

const createUser = async (userData: CreateUserInput) => {
  const emailExists = await UserModel.findOne({ email: userData.email });
  if (emailExists) {
    throw new AppError("Email already in use.", 409);
  }
  const newUser = await UserModel.create(userData);
  return newUser.save();
};

const updateUser = async (id: string, userData: CreateUserInput) => {
  const hashedPassword = await authService.hashPassword(userData.password);
  const userToUpdate = await getUserById(id);
  Object.assign(userToUpdate, { ...userData, password: hashedPassword });
  return userToUpdate.save();
};

const patchUser = async (id: string, userData: PatchUserInput) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    userData.password
      ? {
          ...userData,
          password: await authService.hashPassword(userData.password),
        }
      : userData,
    {
      runValidators: true,
      new: true,
    }
  );
  if (!updatedUser) {
    throw new AppError(`User with ID: ${id} not found.`, 404);
  }
  return updatedUser;
};

const deleteUser = async (id: string) => {
  const deletedUser = await UserModel.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new AppError(`User with ID: ${id} not found.`, 404);
  }
  return deletedUser;
};

export const userService = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
};
