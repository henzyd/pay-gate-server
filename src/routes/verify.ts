import express from "express";
import { body } from "express-validator";
import verifyEmail from "../controllers/verifyEmail";
import verifyOtp from "../controllers/verifyOtp";
import requestValidation, { emailVaidator } from "../utils/validator";

const router = express.Router();

router.use("/email", [emailVaidator()], requestValidation, verifyEmail);
router.use(
  "/otp",
  [
    body("code")
      .notEmpty()
      .isInt()
      .isLength({ min: 6, max: 6 })
      .withMessage("Invalid OTP code, must be 6 digits long"),
  ],
  requestValidation,
  verifyOtp
);

export default router;
