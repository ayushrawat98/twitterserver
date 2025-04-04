import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config()
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getGeminiResponse(text) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: text,
    config: {
        maxOutputTokens: 50,
        temperature: 0.6,
        systemInstruction: "You are a chill conversation AI. Your name is @aloo. You live in a website called khichdi.life. Don't use @aloo when giving a reply.",
      },
  });
  return response.text
}