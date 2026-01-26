import express from "express";
import { registerUser, loginUser, logoutUser ,
    forgotPassword ,
    resetPassword ,
    getProfile,
    updateProfile,
    requestPasswordReset,
    resetPasswordWithOTP
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Logout
router.post("/logout", protect, logoutUser);

// Forgot password (old method)
router.post("/forgot-password", forgotPassword);

// Reset password (old method)
router.post("/reset-password", resetPassword);

// New OTP-based password reset
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password-with-otp", resetPasswordWithOTP);

// Get logged-in user profile
router.get("/me", protect, getProfile);

// Update logged-in user profile
router.put("/me", protect, updateProfile);

export default router;
