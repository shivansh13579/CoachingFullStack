import express from "express";
import { authVerify } from "../middleware/adminAuthentication.js";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudent,
  updateStudent,
} from "../controller/studentController.js";

const router = express.Router();

router.post("/createStudent", authVerify, createStudent);
router.put("/updateStudent/:id", authVerify, updateStudent);
router.get("/getAllStudent", getAllStudents);
router.get("/getStudent/:id", getStudent);
router.delete("/delete/:id", deleteStudent);

export default router;
