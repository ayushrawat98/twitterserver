import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config()
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getGeminiResponse(text) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: text,
    config: {
        maxOutputTokens: 400,
        temperature: 0.7,
        systemInstruction: "Your name is @aloo. You are an AI for website called khichdi.life . Dont write @aloo in your answers. Be concise.",
      },
  });
  return response.text
}