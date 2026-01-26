import express from "express";
import upload from "../config/multer.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import { sendEmail, sendPasswordResetOTP, verifyPasswordResetOTP } from "../controllers/emailController.js"

const router = express.Router();

// General email sending
router.route("/send").post(sendEmail)

// Password reset endpoints
router.route("/send-reset-otp").post(sendPasswordResetOTP)
router.route("/verify-reset-otp").post(verifyPasswordResetOTP)

export default router