import mongoose from "mongoose";
import { StudentFee } from "../model/studentFeeModel.js";

export const createStudentFee = async (req, res) => {
  const admin = req.admin._id;

  const { amount, student, batch, status } = req.body;

  if (!amount || !student || !batch || !status) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const newFee = await StudentFee.create({
      admin,
      amount,
      status,
      batch,
      student,
    });

    await newFee.save();

    return res.status(400).json({
      success: true,
      message: "Student Fee added successfully",
      studentFee: newFee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStudentFee = async (req, res) => {
  const { id } = req.params;
  const admin = req.admin._id;
  const updatedData = req.body;

  try {
    const updateStudentFee = await StudentFee.findByIdAndUpdate(
      { _id: id, admin: admin },
      updatedData,
      {
        new: true,
      }
    );

    if (!updateStudentFee) {
      return res.status(400).json({
        success: false,
        message: "Student fee not found",
      });
    }

    return res.status(200).json({
      success: true,
      studentFee: updateStudentFee,
      message: "Student Fee Updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllStudentsFee = async (req, res) => {
  try {
    const allStudentsFee = await StudentFee.aggregate([
      // Join student info
      {
        $lookup: {
          from: "students",
          localField: "student",
          foreignField: "_id",
          as: "studentData",
        },
      },
      { $unwind: "$studentData" },

      // join Batch info

      {
        $lookup: {
          from: "batches",
          localField: "batch",
          foreignField: "_id",
          as: "batchInfo",
        },
      },
      { $unwind: { path: "$batchInfo", preserveNullAndEmptyArrays: true } },

      // group by student

      {
        $group: {
          _id: "$studentData._id",
          student: { $first: "$studentData" },
          totalAmount: { $sum: "$amount" },
          fees: {
            $push: {
              _id: "$_id",
              amount: "$amount",
              status: "$status",
              batchName: "$batchInfo.batchName",
              createdAt: "$createdAt",
            },
          },
        },
      },
    ]);

    if (!allStudentsFee) {
      return res.status(400).json({
        success: false,
        message: "Student Fee not found",
      });
    }

    return res.status(200).json({
      success: true,
      studentFee: allStudentsFee,
      message: "All Students Fee Get Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStudentById = async (req, res) => {
  const { studentId } = req.params;

  try {
    const studentObjectId = new mongoose.Types.ObjectId(studentId);

    const studentFee = await StudentFee.aggregate([
      {
        $match: {
          student: studentObjectId,
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "student",
          foreignField: "_id",
          as: "studentData",
        },
      },
      {
        $unwind: "$studentData",
      },
      {
        $lookup: {
          from: "batches",
          localField: "batch",
          foreignField: "_id",
          as: "batchData",
        },
      },
      {
        $unwind: "$batchData",
      },
      {
        $group: {
          _id: "$student",
          totalAmount: { $sum: "$amount" },
          student: { $first: "$studentData" },
          payments: {
            $push: {
              amount: "$amount",
              status: "$status",
              batch: "$batchData",
              createdAt: "$createdAt",
            },
          },
        },
      },
    ]);

    if (!studentFee) {
      return res.status(400).json({
        success: false,
        message: "student fee not found",
      });
    }

    return res.status(200).json({
      success: true,
      studentFee: studentFee,
      message: "student fee get successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStudentFee = async (req, res) => {
  const { id } = req.params;

  try {
    const studentFee = await StudentFee.findOne({ _id: id })
      .populate("batch")
      .populate("student");

    if (!studentFee) {
      return res.status(400).json({
        success: false,
        message: "student fee not found",
      });
    }

    return res.status(200).json({
      success: true,
      studentFee: studentFee,
      message: "student fee get successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteStudentFee = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await StudentFee.findById(id);
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Student Fee not found",
      });
    }

    await StudentFee.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Student Fee deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStatusOption = async (req, res) => {
  try {
    const statusEnum = await StudentFee.schema.path("status").enumValues;
    res.status(200).json({
      success: true,
      body: statusEnum,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve status options",
      error,
    });
  }
};
