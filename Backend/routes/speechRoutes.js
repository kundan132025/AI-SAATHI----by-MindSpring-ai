// Backend/routes/speechRoutes.js
import express from "express";
import multer from "multer";
import { transcribeAudio } from "../controllers/speechRecognition.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/speech", upload.single("audio"), transcribeAudio);

export default router;
