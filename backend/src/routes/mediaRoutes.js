import express from 'express'
import { createMedia, getAllMedia, getMediaByCategory ,getSingleMedia ,deactivateMedia } from "../controllers/mediaController.js"
import {protect,admin} from "../middleware/authMiddleware.js"

const router = express.Router();

router.route("/create").post(protect,admin,createMedia);
router.route("/all").get(getAllMedia);
router.route("/category/:category").get(getMediaByCategory);
router.route("/:id").get(getSingleMedia);
router.route("/:id/deactivate").delete(protect,admin,deactivateMedia);

export default router;