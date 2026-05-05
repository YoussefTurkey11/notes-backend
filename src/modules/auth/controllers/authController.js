import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import ApiError from "../../../utils/apiError.js";
import User from "../models/userModel.js";
import * as authService from "../services/authService.js";
import { sanitizeUser } from "../../../utils/sanitizeUser.js";

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password, phone } = req.body;

  const newUser = await authService.register({
    fullName,
    email,
    password,
    phone,
  });

  res.status(StatusCodes.CREATED).json({ user: newUser });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await authService.login({ email, password });

  res.status(StatusCodes.OK).json({ token, user: sanitizeUser(user) });
});
