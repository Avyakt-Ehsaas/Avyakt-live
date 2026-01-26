import express from "express";
import { protect , admin } from "../middleware/authMiddleware.js";

import {
    createSurvey,
    updateSurvey,
    getAllSurveys,
    getActiveSurveys,
    getServeyById,
    getSurveyResponses,
    SubmitSurveyResponse,
    deleteQuestion,
    addQuestionToSurvey,
    updateQuestion,
    publishSurvey,
    getSurveyAnalytics,
} from "../controllers/SurveyController.js"
const router = express.Router();

//admin routes
router.route("/create").post(protect,admin,createSurvey);
router.route("/analytics").get(protect,admin,getSurveyAnalytics);
router.route("/:id").put(protect,admin,updateSurvey);
router.route("/:id/publish").put(protect,admin,publishSurvey);
router.route("/:id/surveyResponses").get(protect,admin,getSurveyResponses);
router.route("/:id/add-questions").post(protect,admin,addQuestionToSurvey);
router.route("/:id/update-questions").put(protect,admin,updateQuestion);
router.route("/:id/delete-question").delete(protect,admin,deleteQuestion);

//user routes
router.route("/").get(protect,getAllSurveys)
router.route("/ActiveSurveys").get(getActiveSurveys)


//public route
router.route("/getSurvey/:id").get(getServeyById);
router.route("/:id/submitSurvey").post(SubmitSurveyResponse);

export default router;
