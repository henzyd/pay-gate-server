import OtpModel from "../models/otp";
import UserModel from "../models/user";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

const verifyOtp = catchAsync(async (req, res, next) => {
  const { code } = req.body;

  const otp = await OtpModel.findOne({
    code,
  });

  if (!otp) {
    return next(new AppError("Invalid code", 400));
  }

  if (otp.expiresAt < new Date()) {
    return next(new AppError("Code expired", 400));
  }

  await otp.deleteOne();

  const updatedUser = await UserModel.findByIdAndUpdate(otp.user, {
    isVerified: true,
  });

  if (updatedUser) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "User verified successfully",
  });
});

export default verifyOtp;
