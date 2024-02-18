import express from "express";
import verifyEmail from "../controllers/verifyEmail";
import requestValidation, { emailVaidator } from "../utils/validator";

const router = express.Router();

router.use("/email", [emailVaidator()], requestValidation, verifyEmail);

export default router;
