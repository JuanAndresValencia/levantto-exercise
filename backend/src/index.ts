import "dotenv/config";
import express from "express";
import cors from "cors";
import { askQuestion } from "./claude.js";
import { knowledgeSections } from "./knowledgeBase.js";
import { createEndpointLimiter } from "./rateLimiter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/sections", createEndpointLimiter(), (_req, res) => {
  res.json({ sections: knowledgeSections });
});

app.post("/api/ask", createEndpointLimiter(), async (req, res) => {
  const question = req.body?.question;
  if (typeof question !== "string" || question.trim().length === 0) {
    res.status(400).json({ error: "question is required" });
    return;
  }

  try {
    const result = await askQuestion(question.trim());
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get an answer" });
  }
});

const port = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
