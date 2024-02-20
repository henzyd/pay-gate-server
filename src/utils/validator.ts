import { body, validationResult } from "express-validator";
import { customErrorFormatter } from "./helper";
import AppError from "./appError";
import catchAsync from "./catchAsync";

const requestValidation = catchAsync(async (req, _, next) => {
  const errors = validationResult(req).formatWith(customErrorFormatter);
  if (!errors.isEmpty()) {
    return next(
      new AppError("Invalid request data", 400, errors.array().slice(-1))
    );
  }
  next();
});

export const emailVaidator = () =>
  body("email").trim().isEmail().withMessage("Invalid email address");

export default requestValidation;
