import express from "express"
import { admin, protect } from "../middleware/authMiddleware.js";
import { createWebinar ,
    getAllWebinars ,
    getWebinarById,
    updateWebinar,
    deleteWebinarbyID
} from "../controllers/webinarController.js";

const router = express.Router();

router.post("/create",protect,admin,createWebinar);

router.get("/all-webinars",protect,getAllWebinars);

router.get("/:id",protect,getWebinarById);

router.put("/:id",protect,updateWebinar);

router.delete("/:id",protect,deleteWebinarbyID)

export default router

