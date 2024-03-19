import PaymentModel from "../models/payment";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { currencies } from "../utils/helper";

const initializePayment = catchAsync(async (req, res, next) => {
  const { amount, currency } = req.body;
  const currentUser = req._currentUser;

  let provider = "";

  if (currencies.paystack.includes(currency)) {
    provider = "paystack";
  }

  if (currencies.stripe.includes(currency)) {
    provider = "stripe";
  }

  if (!provider) {
    return next(new AppError("Provider not available for this currency", 400));
  }

  const payment = await PaymentModel.create({
    amount,
    currency,
    user: currentUser._id,
    provider,
    initializedAt: Date.now(),
  });

  res.status(200).json({
    status: "success",
    message: "Payment initialized",
    data: payment,
  });
});

export default initializePayment;
