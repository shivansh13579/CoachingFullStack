import express from "express";
import {
  createBatch,
  deleteBatch,
  getAllBatches,
  getBatch,
  updateBatch,
} from "../controller/batchController.js";
import { authVerify } from "../middleware/adminAuthentication.js";

const router = express.Router();

router.post("/createBatch", authVerify, createBatch);
router.put("/updateBatch/:id", authVerify, updateBatch);
router.get("/getBatches", getAllBatches);
router.get("/getBatch/:id", getBatch);
router.delete("/delete/:id", deleteBatch);

export default router;
