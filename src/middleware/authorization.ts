import { Request, NextFunction } from "express";
import cache from "memory-cache";
import ms from "ms";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import UserModel, { User } from "../models/user";

export const authorization = catchAsync(
  async (req: Request, _, next: NextFunction) => {
    const userId = cache.get("userId");

    if (!userId) {
      return next(new AppError("Authorization has expired", 401));
    }

    const user = (await UserModel.findById(userId)) as User;

    if (!user) {
      return next(new AppError("User does not exist", 401));
    }

    if (!user.isVerified) {
      return next(new AppError("User not verified", 401));
    }

    const timeDiff = Math.abs(user.verifiedAt.getTime() - new Date().getTime());

    if (timeDiff > ms("1w")) {
      return next(new AppError("Session expired", 401));
    }

    req._currentUser = user;

    next();
  }
);
