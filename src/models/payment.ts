import { Schema, model } from "mongoose";

export type Payment = {
  amount: number;
  currency: string;
  state: string;
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
});

const PaymentModel = model("Payment", schema);

export default PaymentModel;
