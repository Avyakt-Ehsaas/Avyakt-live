import express from "express";
import { registerUser, loginUser, logoutUser ,
    forgotPassword ,
    resetPassword ,
    getProfile,
    updateProfile
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Logout
router.post("/logout", protect, logoutUser);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.post("/reset-password", resetPassword);

// Get logged-in user profile
router.get("/me", protect, getProfile);

// Update logged-in user profile
router.put("/me", protect, updateProfile);

export default router;
