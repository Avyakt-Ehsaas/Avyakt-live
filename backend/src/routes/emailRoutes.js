import express from "express";
import upload from "../config/multer.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import { sendCsvEmails } from "../controllers/emailController.js";

const router = express.Router();

router.route("/send-csv").post(protect,admin , upload.single("csv"),sendCsvEmails);

export default router