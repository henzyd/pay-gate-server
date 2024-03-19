import express from "express";
import morgan from "morgan";
import cors from "cors";
import { NODE_ENV } from "./env";
import AppError from "./utils/appError";
import { authorization } from "./middleware/authorization";
import requestValidation, { emailVaidator } from "./utils/validator";
import globalErrorHandler from "./controllers/errorHandler";
import renewSession from "./controllers/renewSession";

//? Routes
import verifyRoute from "./routes/verify";
import paymentRoute from "./routes/payment";

const app = express();

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.status(200).json({
    status: "success",
    message: `Welcome to the PayGate <${NODE_ENV}> server`,
  });
});

app.use("/verify", verifyRoute);
app.use("/payment", authorization, paymentRoute);
app.use("/renew-session", [emailVaidator()], requestValidation, renewSession);

app.all("*", (req, _, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
