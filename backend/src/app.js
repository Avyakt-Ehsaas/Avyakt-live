import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js"

import emailRoutes from "./routes/emailRoutes.js"
import feedbackRoutes  from "./routes/feedbackRoutes.js"
import emotionTrackingRoutes from "./routes/emotionTrackingRoutes.js"
import SurveyRoutes from "./routes/surveyRoutes.js"
import MediaRoutes from "./routes/mediaRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import zoomRoutes from "./routes/zoomRoutes.js"

const app = express();

const allowedOrigins = [
  "https://avaykt-ehsaas.netlify.app",
  "https://avyaktehsaas.netlify.app",
  "http://localhost:5173",
  "https://avyaktehsaas.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ FIXED

// routes


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/meetings",meetingRoutes)

app.use("/api/email", emailRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/emotion-tracking", emotionTrackingRoutes);
app.use("/api/surveys",SurveyRoutes)
app.use("/api/media",MediaRoutes)
app.use("/api/categories", categoryRoutes);

app.use("/api/zoom", zoomRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("Server is running 🚀");
});



export default app;
