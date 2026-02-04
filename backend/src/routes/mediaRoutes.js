import express from "express";
import {
  createMedia,
  getAllMedia,
  getMediaByCategory,
  getSingleMedia,
  deactivateMedia,
  getSingleMediaByCategory
} from "../controllers/mediaController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// =============================
// ADMIN ROUTES
// =============================
router.post("/create", protect, admin, createMedia);
router.delete("/:id/deactivate", protect, admin, deactivateMedia);

// =============================
// PUBLIC ROUTES
// =============================
router.get("/all", getAllMedia);

//  categoryId instead of category string
router.get("/category/:categoryId", getMediaByCategory);
router.get("/category/:categoryId/surveyResult",getSingleMediaByCategory)
router.get("/:id", getSingleMedia);

export default router;
