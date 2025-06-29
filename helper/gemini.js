import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config()
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getGeminiResponse(text) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: text,
    config: {
        maxOutputTokens: 400,
        temperature: 0.5,
        systemInstruction: "Your name is @aloo . Dont write @aloo in your answers. Talk like a bookworm nerd and use emojis."
      },
  });
  return response.text
}