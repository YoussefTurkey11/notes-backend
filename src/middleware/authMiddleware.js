import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const protect = (req, res, next) => {
  let token;

  if (req.header.authorization?.startWith("Bearer")) {
    token = req.header.authorization.split(" ")[1];
  }

  if (!token) {
    return next(ApiError(`Not authorized`, StatusCodes.UNAUTHORIZED));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(ApiError(`Forbidden`, StatusCodes.FORBIDDEN));
    }
    next();
  };
};
