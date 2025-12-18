import express from "express";
import cors from "cors";
import detectRoutes from "./routes/detect.route";
import historyRoutes from "./routes/history.route";
import newsRoutes from "./routes/news.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", detectRoutes);
app.use("/api", historyRoutes);
app.use("/api", newsRoutes);


app.get("/", (_req, res) => {
  res.send("Fake News Detector API is running");
});



export default app;
