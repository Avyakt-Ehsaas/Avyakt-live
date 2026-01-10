import express from 'express';
import {
  submitEmotionTracking,
  getEmotionHistory,
  getEmotionAnalytics,
  getEmotionComparison
} from '../controllers/emotionTrackingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   POST /api/emotion-tracking
router.post('/', submitEmotionTracking);

// @route   GET /api/emotion-tracking/history
router.get('/history', getEmotionHistory);

// @route   GET /api/emotion-tracking/analytics
router.get('/analytics', getEmotionAnalytics);

// @route   GET /api/emotion-tracking/comparison
router.get('/comparison', getEmotionComparison);

export default router;
