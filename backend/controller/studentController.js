import Student from "../model/studentModel.js";

export const createStudent = async (req, res) => {
  const admin = req.admin._id;

  const { studentName, fatherName, mobile, parentMobile, batch } = req.body;

  if (!studentName || !fatherName || !mobile || !parentMobile || !batch) {
    return res.status(400).json({
      status: false,
      message: "All fields are required",
    });
  }

  try {
    const isStudentExist = await Student.findOne({
      admin: admin,
      batch: batch,
      studentName: studentName,
      mobile: mobile,
    });

    if (isStudentExist) {
      return res.status(400).json({
        success: false,
        message: "Student is already exist",
      });
    }

    const newStudent = await Student.create({
      admin,
      studentName,
      fatherName,
      mobile,
      parentMobile,
      batch,
    });

    await newStudent.save();

    return res.status(400).json({
      success: true,
      message: "Student created successfully",
      student: newStudent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const admin = req.admin._id;
  const updatedData = req.body;

  try {
    const updateStudent = await Student.findByIdAndUpdate(
      { _id: id, admin: admin },
      updatedData,
      {
        new: true,
      }
    );

    if (!updateStudent) {
      return res.status(400).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      student: updateStudent,
      message: "Student Updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllStudents = async (req, res) => {
  const admin = req.admin._id;
  try {
    const allStudents = await Student.find({ admin }).populate("batch");
    if (!allStudents) {
      return res.status(400).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      student: allStudents,
      message: "All Students Get Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStudent = async (req, res) => {
  const { id } = req.params;
  const admin = req.admin._id;

  try {
    const student = await Student.findOne({ _id: id, admin }).populate("batch");

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "student not found",
      });
    }

    return res.status(200).json({
      success: true,
      student: student,
      message: "student get successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const admin = req.admin._id;

  try {
    const student = await Student.findOne({ _id: id, admin });
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Student not found",
      });
    }

    await Student.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
