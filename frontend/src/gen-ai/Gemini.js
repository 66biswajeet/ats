import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = "AIzaSyD8P3sgaJEzGGsi6Y-rAtm8gobDETLWjKU";
const API_KEY = "AIzaSyDutIptXVtQwUDkJKnZjI4ImyoA1wXueXc";
// const API_KEY = "AIzaSyBPmBbfDBFQS5Hoo7sVnscF-PndQJCRhno";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,

  history: [],
});

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = "AIzaSyBPmBbfDBFQS5Hoo7sVnscF-PndQJCRhno";
// const MAX_RETRIES = 3;
// const INITIAL_DELAY = 1000; // 1 second

// // Utility function for delay
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// // Initialize the AI model
// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// // Create a chat session with retry logic
// class ReliableChatSession {
//   constructor() {
//     this.session = model.startChat({
//       generationConfig,
//       history: [],
//     });
//   }

//   async sendMessage(message) {
//     let lastError;

//     for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
//       try {
//         // If not first attempt, use fallback model
//         if (attempt > 0) {
//           const fallbackModel = genAI.getGenerativeModel({
//             model: "gemini-1.0-pro", // Fallback to more stable model
//           });
//           this.session = fallbackModel.startChat({
//             generationConfig,
//             history: [],
//           });
//         }

//         const result = await this.session.sendMessage(message);
//         return await result.response.text();
//       } catch (error) {
//         lastError = error;
//         console.log(`Attempt ${attempt + 1} failed:`, error.message);

//         if (
//           error.message.includes("503") ||
//           error.message.includes("overloaded")
//         ) {
//           const backoffDelay = INITIAL_DELAY * Math.pow(2, attempt);
//           console.log(`Retrying in ${backoffDelay / 1000} seconds...`);
//           await delay(backoffDelay);
//           continue;
//         }

//         // If it's not a 503 error, throw immediately
//         throw error;
//       }
//     }

//     // If we've exhausted all retries
//     throw new Error(
//       `Failed after ${MAX_RETRIES} attempts. Last error: ${lastError.message}`
//     );
//   }

//   // Reset the chat session
//   reset() {
//     this.session = model.startChat({
//       generationConfig,
//       history: [],
//     });
//   }
// }

// // Export a single instance
// export const chatSession = new ReliableChatSession();

// // Example usage:
// // try {
// //   const response = await chatSession.sendMessage("Your message here");
// //   console.log(response);
// // } catch (error) {
// //   console.error("Failed to get response:", error);
// // }
