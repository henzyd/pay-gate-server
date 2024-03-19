import express from "express";
import { body } from "express-validator";
import requestValidation from "../utils/validator";
import initializePayment from "../controllers/initializePayment";

const router = express.Router();

router.use(
  "/initialize",
  [
    body("amount")
      .isNumeric()
      .withMessage("Amount is required and must be a number"),
    body("currency")
      .isString()
      .trim()
      .notEmpty()
      .toUpperCase()
      .withMessage("Currency is required and must be a string"),
  ],
  requestValidation,
  initializePayment
);

export default router;
