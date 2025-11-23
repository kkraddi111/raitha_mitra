import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const apiKey = import.meta.env.VITE_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are 'Raitha Mitra', an expert agricultural assistant for farmers in India, specifically Karnataka.
Your goal is to help farmers with questions about crops, weather, government schemes, and farming techniques.

CRITICAL LANGUAGE RULES:
1. If the user input is in Kannada, YOU MUST REPLY IN KANNADA.
2. If the user input is in English, reply in English.
3. If the user asks to speak in Kannada, switch to Kannada immediately.

Keep answers concise, practical, and easy to understand for a rural audience. 
Avoid overly technical jargon unless explained.
`;

export const GeminiService = {
  sendMessage: async (history: ChatMessage[], newMessage: string): Promise<string> => {
    if (!apiKey) {
      return "API Key is missing. Please check configuration.";
    }

    try {
      // Convert internal history to Gemini format if needed, 
      // but for simple context, we will use a fresh chat or just send the prompt with context.
      // Ideally, use ai.chats.create for multi-turn.
      
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster response
        }
      });

      // Replay history to establish context (simple implementation)
      // In a production app, we would manage the session history object more carefully.
      for (const msg of history) {
        if (msg.role === 'user') {
          await chat.sendMessage({ message: msg.text });
        }
        // Note: We can't easily inject model responses into the history object 
        // without a complex workaround in this SDK version, so we rely on the system 
        // instruction and the current prompt primarily, or just the user's last few turns.
      }

      const response = await chat.sendMessage({ message: newMessage });
      return response.text || "I'm sorry, I couldn't understand that.";

    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while connecting to the AI assistant. Please try again.";
    }
  }
};
