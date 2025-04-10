import express from "express";
import { authVerify } from "../middleware/adminAuthentication.js";
import {
  createStudentFee,
  deleteStudentFee,
  getAllStudentsFee,
  getStatusOption,
  getStudentById,
  getStudentFee,
  updateStudentFee,
} from "../controller/studentFeeController.js";

const router = express.Router();

router.post("/createStudentFee", authVerify, createStudentFee);
router.put("/updateStudentFee/:id", authVerify, updateStudentFee);
router.get("/getAllStudentFee", authVerify, getAllStudentsFee);
router.get("/getStudentFee/:id", authVerify, getStudentFee);
router.get("/getStudentId/:studentId", authVerify, getStudentById);
router.get("/getStatus", getStatusOption);
router.delete("/deleteFee/:id", authVerify, deleteStudentFee);

export default router;
