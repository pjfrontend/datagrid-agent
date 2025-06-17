import { OpenAI } from "openai/index.mjs";
import type { ResponseInput } from "openai/resources/responses/responses.mjs";

const openAIClient = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // only use in testing
});

export const queryOpenAI = async (systemPrompt: string, prompt: string)=>{
      const input: ResponseInput = [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ];
    
      const response = await openAIClient.responses.create({
        model: "gpt-4o-mini",
        input,
        truncation: "auto",
        temperature: 0,
      });

      const result = response.output_text;
      if (!result) {
        throw new Error("No output received from OpenAI.");
      }

      return result;
}