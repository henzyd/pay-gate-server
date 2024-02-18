import { Schema, model, Types } from "mongoose";

export type User = {
  email: string;
  isVerified: boolean;
  verifiedAt: Date;
  otps: Types.ObjectId[];
  payments: Types.ObjectId[];
};

const schema = new Schema<User>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedAt: {
      type: Date,
    },
    otps: [
      {
        type: Schema.ObjectId,
        ref: "Otp",
        select: false,
      },
    ],
    payments: [
      {
        type: Schema.ObjectId,
        ref: "Payment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = model<User>("User", schema);

export default UserModel;
