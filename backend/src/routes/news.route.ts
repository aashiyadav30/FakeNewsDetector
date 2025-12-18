import { Router } from "express";
import { getLatestNews } from "../controllers/news.controller";

const router = Router();

router.get("/news", getLatestNews);

export default router;
