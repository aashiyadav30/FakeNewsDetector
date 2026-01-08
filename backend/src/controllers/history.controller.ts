import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const getHistory = async (_req: Request, res: Response) => {
  try {
    const history = await prisma.newsCheck.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 100, // latest 100 results
    });

    return res.json(history);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch history" });
  }
};
