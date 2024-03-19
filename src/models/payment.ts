import { Schema, Types, model } from "mongoose";

export type Payment = {
  amount: number;
  currency: string;
  state: string;
  provider: string;
  user: Types.ObjectId;
  initializedAt: Date;
  payedAt: Date;
};

const schema = new Schema<Payment>({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  provider: {
    type: String,
    enum: ["paystack", "stripe"],
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  initializedAt: {
    type: Date,
    required: true,
  },
  payedAt: {
    type: Date,
  },
});

const PaymentModel = model("Payment", schema);

export default PaymentModel;
