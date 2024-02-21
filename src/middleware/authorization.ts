import { Request, NextFunction } from "express";
import cache from "memory-cache";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import UserModel, { User } from "../models/user";

const authorization = catchAsync(
  async (req: Request, _, next: NextFunction) => {
    const userId = cache.get("foo");

    if (!userId) {
      return next(new AppError("Authorization has expired", 401));
    }

    const user = (await UserModel.findById(userId)) as User;

    if (!user) {
      return next(new AppError("User does not exist", 404));
    }

    if (!user.isVerified) {
      return next(new AppError("User not verified", 401));
    }

    req._currentUser = user;

    next();
  }
);

export { authorization };
