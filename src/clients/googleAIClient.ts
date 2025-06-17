import { GoogleGenerativeAI } from '@google/generative-ai';

const googleAIClient = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const queryGoogleAI = async (systemPrompt: string, prompt: string)=>{
  const model = googleAIClient.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or "gemini-1.5-flash", "gemini-1.5-pro", etc.

  const response = await model.generateContent({
    contents: [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "user", parts: [{ text: prompt }] },
    ],
    generationConfig: {
      temperature: 0,
      responseMimeType: "application/json", // Crucial for getting JSON output
    },
  });

  const result = response.response.text();
  if (!result) {
    throw new Error("No output received from Google AI.");
  }

  return result;
}
