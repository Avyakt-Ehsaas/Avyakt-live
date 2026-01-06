import express from "express"
import { admin, protect } from "../middleware/authMiddleware.js";
import { createWebinar ,
    getAllWebinars ,
    getWebinarById,
    updateWebinar,
    deleteWebinarbyId,
    getOngoingWebinars,
    getWebinarAttendees,
    registerAttendee,
    getWebinarSessions
} from "../controllers/webinarController.js";

const router = express.Router();

// Admin routes (require admin role)
router.post("/create", protect, admin, createWebinar);
router.put("/:id", protect, admin, updateWebinar);
router.delete("/:id", protect, admin, deleteWebinarbyId);

// Public/User routes (require authentication)
router.get("/all-webinars", protect, getAllWebinars);
router.get("/ongoing", protect, getOngoingWebinars);
router.get("/:id", protect, getWebinarById);
router.get("/:id/attendees", protect, admin, getWebinarAttendees);
router.get("/:id/sessions", protect, getWebinarSessions);
router.post("/:id/register", protect, registerAttendee);

router.get("/ping", (req, res) => {
  res.send("Webinar routes working");
});


export default router

