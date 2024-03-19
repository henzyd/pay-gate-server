import cache from "memory-cache";
import catchAsync from "../utils/catchAsync";
import UserModel from "../models/user";
import AppError from "../utils/appError";

const renewSession = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(new AppError("User does not exist", 404));
  }

  cache.put("userId", user._id);

  res.status(200).json({
    status: "success",
    message: "Session renewed",
  });
});

export default renewSession;
