import { Admin } from "../model/adminModel.js";
import jwt from "jsonwebtoken";

export const authVerify = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(400).json({
        message: "admin not validate",
      });
    }

    const token = authorization?.replace("Bearer ", "");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const admin = await Admin.findById(decodedToken.id);

    if (!admin) {
      return res.status(400).json({
        message: "Validation Failed",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
