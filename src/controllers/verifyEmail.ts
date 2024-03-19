import ms from "ms";
import OtpModel from "../models/otp";
import UserModel from "../models/user";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { sendOtpMail } from "../utils/email";

const verifyEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  let user = await UserModel.findOne({ email });

  if (user?.isVerified) {
    return next(new AppError("Email already verified", 400, user));
  }

  if (!user) {
    user = await UserModel.create({ email });
  }

  const otp = await OtpModel.create({
    code: Math.floor(100000 + Math.random() * 900000),
    expiresAt: new Date(Date.now() + ms("5m")),
    user: user._id,
  });

  try {
    await sendOtpMail({
      email: user.email,
      code: otp.code,
    });
  } catch (error) {
    throw new AppError("Failed to send OTP email", 500);
  }

  res.status(200).json({
    status: "success",
    message: "Otp has been sent to your email",
  });
});

export default verifyEmail;
