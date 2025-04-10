import { Schema, model } from "mongoose";

const studentSchema = Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      require: true,
    },
    mobile: {
      type: String,
      require: true,
    },
    parentMobile: {
      type: String,
      require: true,
    },
    batch: {
      type: Schema.Types.ObjectId,
      ref: "batch",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  {
    timestamps: true,
  }
);

const Student = model("student", studentSchema);

export default Student;
