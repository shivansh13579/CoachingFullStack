import { Batch } from "../model/batchModel.js";

export const createBatch = async (req, res) => {
  const admin = req.admin._id;

  const {
    batchName,
    studentLimit,
    batchStartDate,
    batchEndDate,
    batchStartTime,
    batchEndTime,
    batchFee,
    description,
  } = req.body;

  if (!batchName) {
    return res.status(400).json({
      success: false,
      message: "Batch Name is required",
    });
  }
  if (!studentLimit) {
    return res.status(400).json({
      success: false,
      message: "Student Limit is required",
    });
  }
  if (!batchStartDate) {
    return res.status(400).json({
      success: false,
      message: "Batch Start Date Date is required",
    });
  }
  if (!batchEndDate) {
    return res.status(400).json({
      success: false,
      message: "Batch End Date is required",
    });
  }
  if (!batchStartTime) {
    return res.status(400).json({
      success: false,
      message: "Batch Start Time is required",
    });
  }
  if (!batchEndTime) {
    return res.status(400).json({
      success: false,
      message: "Batch End Time is required",
    });
  }
  if (!batchFee) {
    return res.status(400).json({
      success: false,
      message: "Batch Fee is required",
    });
  }

  try {
    const isBatchExist = await Batch.findOne({
      admin: admin,
      batchName: batchName,
    });

    if (isBatchExist) {
      return res.status(400).json({
        success: false,
        message: "Batch is already exist",
      });
    }

    const newBatch = await Batch.create({
      admin,
      batchName,
      studentLimit,
      batchStartDate,
      batchEndDate,
      batchStartTime,
      batchEndTime,
      batchFee,
      description,
    });

    await newBatch.save();

    return res.status(400).json({
      success: true,
      message: "Batch created successfully",
      batch: newBatch,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBatch = async (req, res) => {
  const { id } = req.params;
  const admin = req.admin._id;
  const updatedData = req.body;

  try {
    const updateBatch = await Batch.findByIdAndUpdate(
      { _id: id, admin: admin },
      updatedData,
      {
        new: true,
      }
    );

    if (!updateBatch) {
      return res.status(400).json({
        success: false,
        message: "Batch not found",
      });
    }

    return res.status(200).json({
      success: true,
      batch: updateBatch,
      message: "Batch Updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBatches = async (req, res) => {
  try {
    const allBatches = await Batch.find();
    if (!allBatches) {
      return res.status(400).json({
        success: false,
        message: "Batch not found",
      });
    }

    return res.status(200).json({
      success: true,
      batch: allBatches,
      message: "All Batches Get Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBatch = async (req, res) => {
  const { id } = req.params;

  try {
    const batch = await Batch.findOne({ _id: id });

    if (!batch) {
      return res.status(400).json({
        success: false,
        message: "Batch not found",
      });
    }

    return res.status(200).json({
      success: true,
      batch: batch,
      message: "Batch get successfully",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBatch = async (req, res) => {
  const { id } = req.params;

  try {
    const batch = await Batch.findById(id);
    if (!batch) {
      return res.status(400).json({
        success: false,
        message: "Batch not found",
      });
    }

    await Batch.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "batch deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
