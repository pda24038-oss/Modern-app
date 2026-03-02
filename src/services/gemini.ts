import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function askAboutArt(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const model = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "You are an expert art historian specializing in modern art (late 19th century to present). Provide insightful, engaging, and accurate information about art movements, artists, techniques, and specific artworks. Keep responses concise but informative. Use markdown for formatting.",
      }
    });

    const response = await model;
    return response.text || "I'm sorry, I couldn't find information on that. Could you try rephrasing?";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "I'm having trouble connecting to my art database right now. Please try again in a moment.";
  }
}
