import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { generateToken } from "../../../utils/generateToken.js";
import jwt from "jsonwebtoken";
import ApiError from "../../../utils/apiError.js";
import User from "../models/userModel.js";
import { sanitizeUser } from "../../../utils/sanitizeUser.js";

export const register = async ({ fullName, email, password, phone }) => {
  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new ApiError("User already exists", StatusCodes.BAD_REQUEST);
  }

  const newUser = await User.create({
    fullName,
    email,
    phone,
    password,
  });

  return sanitizeUser(newUser);
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(`Invalid credentials`, StatusCodes.BAD_REQUEST);
  }

  const isMatched = await user.comparePassword(password);
  if (!user || !isMatched) {
    throw new ApiError("Invalid credentials", StatusCodes.BAD_REQUEST);
  }

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return { user, token };
};
