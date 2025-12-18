import { Request, Response } from "express";
import { fetchLatestNews } from "../services/news.service";

export const getLatestNews = async (_req: Request, res: Response) => {
  try {
    const news = await fetchLatestNews();
    return res.json(news);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
};
