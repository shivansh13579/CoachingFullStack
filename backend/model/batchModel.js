import { Schema, model } from "mongoose";

const batchSchema = Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    batchName: {
      type: String,
      required: true,
      unique: true,
    },
    studentLimit: {
      type: Number,
      required: true,
    },
    batchStartDate: {
      type: Date,
      required: true,
    },
    batchEndDate: {
      type: Date,
      required: true,
    },
    batchStartTime: {
      type: String,
      required: true,
    },
    batchEndTime: {
      type: String,
      required: true,
    },
    batchFee: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Batch = model("batch", batchSchema);
