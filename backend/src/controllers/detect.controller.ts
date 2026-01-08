import axios from "axios";
import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

const ML_API_URL = "http://localhost:5001/predict";

const RED_FLAG_KEYWORDS = [
  "cure cancer",
  "miracle cure",
  "instantly",
  "scientists confirm",
  "doctors don't want you to know",
  "secret cure",
  "no medical treatment",
  "100% effective",
  "guaranteed cure",
  "hidden truth",
  "one simple trick"
];

export const detectNews = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    if (!content || typeof content !== "string") {
      return res.status(400).json({ error: "Content is required" });
    }

    const mlResponse = await axios.post(ML_API_URL, {
      text: content
    });

    let { verdict, confidence } = mlResponse.data;

    const textLower = content.toLowerCase();

    const hasRedFlags = RED_FLAG_KEYWORDS.some(keyword =>
      textLower.includes(keyword)
    );

    // FINAL DECISION LOGIC
    if (confidence < 0.75) {
      verdict = hasRedFlags ? "FAKE" : "UNCERTAIN";
    }

    // Map verdict to the DB enum (Prisma currently supports only REAL/FAKE)
    const verdictToStore =
      verdict === "UNCERTAIN" ? (hasRedFlags ? "FAKE" : "REAL") : verdict;

    const explanation =
      verdict === "UNCERTAIN"
        ? "The content is ambiguous. Please verify with trusted sources."
        : undefined;

    // Persist the check to the database
    try {
      await prisma.newsCheck.create({
        data: {
          content,
          verdict: verdictToStore as any,
          confidence: Number(confidence),
          explanation,
        },
      });
    } catch (dbErr) {
      console.error("Failed to save news check:", dbErr);
    }

    return res.json({
      verdict,
      confidence,
      reason: explanation,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Detection failed" });
  }
};
