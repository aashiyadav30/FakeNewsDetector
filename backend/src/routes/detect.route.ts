import { Router } from "express";
import { detectNews } from "../controllers/detect.controller";

const router = Router();

router.post("/detect", detectNews);

export default router;
