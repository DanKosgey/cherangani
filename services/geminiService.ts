
// This is a mock service. In a real application, you would import and use the @google/genai library.
// import { GoogleGenAI } from "@google/genai";

import { ChatMessage } from '../types';

// Mock implementation to simulate API calls without needing an actual API key.
export const getAiResponse = async (
  message: string,
  history: ChatMessage[]
): Promise<string> => {
  console.log("Simulating Gemini API call with message:", message);
  console.log("Conversation history:", history);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerCaseMessage = message.toLowerCase();

  if (lowerCaseMessage.includes("order status")) {
    return "To check your order status, please visit the `/orders` page. If you need more help, I can connect you with a human agent.";
  }
  if (lowerCaseMessage.includes("bulk") || lowerCaseMessage.includes("wholesale")) {
    return "For bulk orders, please switch to the 'Wholesale' profile using the toggle in the header. You'll see carton pricing and be able to place larger orders. Let me know if you need help creating a bulk order template!";
  }
  if (lowerCaseMessage.includes("delivery")) {
    return "We offer scheduled deliveries! During checkout, you can select your preferred delivery day and time slot. We deliver from Monday to Saturday, 8 AM to 6 PM.";
  }
   if (lowerCaseMessage.includes("yogurt")) {
    return "We have several yogurts! Our best-sellers are the Natural Greek Yogurt for its high protein content, and the Strawberry Flavored Yogurt, which is a favorite among kids. Which one would you like to know more about?";
  }
  if (lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hello")) {
    return "Hello! I'm the Cherengani Dairy assistant. How can I help you today? You can ask about products, delivery, or bulk orders.";
  }

  return "I'm sorry, I'm not sure how to help with that. Can you please rephrase? You can ask about our products, delivery schedules, or bulk pricing. You can also ask to speak to a human agent.";
};
