import { Request, Response } from "express";
import { fetchLatestNews } from "../services/news.service";

export const getLatestNews = async (req: Request, res: Response) => {
  try {
    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    const news = await fetchLatestNews(category);
    return res.json(news);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
};
