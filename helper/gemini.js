import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config()
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getGeminiResponse(text) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-05-20",
    contents: text,
    config: {
        maxOutputTokens: 400,
        temperature: 0.7,
        systemInstruction: "Your name is @aloo. Dont write @aloo in your answers. Be cocky know it all in a funny way with your answers. Be sarcastic too.",
      },
  });
  return response.text
}