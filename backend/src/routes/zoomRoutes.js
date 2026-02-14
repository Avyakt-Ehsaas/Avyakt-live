import express from "express";
import generateSignature from "../util/zoomSignature.js";

const router = express.Router();

// Route to get Zoom Meeting Signature/JWT Token
router.post("/signature", (req, res) => {
  const { meetingNumber, role } = req.body;

  if (!meetingNumber || role === undefined || role === null) {
    return res.status(400).json({
      success: false,
      message: "meetingNumber and role are required",
      received: { meetingNumber, role }
    });
  }

  try {
    const signature = generateSignature(meetingNumber, role);
    res.json({
      success: true,
      signature: signature
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate signature",
      error: error.message
    });
  }
});

export default router;