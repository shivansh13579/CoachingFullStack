import { Schema, model } from "mongoose";

const studentFee = Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "student",
    },
    batch: {
      type: Schema.Types.ObjectId,
      ref: "batch",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    status: {
      type: String,
      enum: ["unpaid", "paid", "partial"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const StudentFee = model("Fee", studentFee);
