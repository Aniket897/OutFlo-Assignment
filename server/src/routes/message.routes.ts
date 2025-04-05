import { NextFunction, Request, Response, Router } from "express";
import { GoogleGenAI } from "@google/genai";

import { generatePrompt } from "../helpers";

const routes = Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

routes.post("/", async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const { name, job_title, company, location, summary } = req.body;

    const prompt = generatePrompt(name, job_title, company, location, summary);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    resp.status(200).json({ message: response.text });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
});

export default routes;
