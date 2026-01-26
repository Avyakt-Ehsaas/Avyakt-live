import express from "express";
import {
  createCategory,
  getAllCategories,
  getActiveCategories,
  getSingleCategory,
  updateCategory,
  deactivateCategory
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// =============================
// ADMIN ROUTES
// =============================
router.post("/create", protect, admin, createCategory);
router.get("/all", protect, admin, getAllCategories);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id/deactivate", protect, admin, deactivateCategory);

// =============================
// PUBLIC ROUTES
// =============================
router.get("/active", getActiveCategories);
router.get("/:id", getSingleCategory);

export default router;
