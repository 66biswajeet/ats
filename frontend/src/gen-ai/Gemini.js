import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = "AIzaSyD8P3sgaJEzGGsi6Y-rAtm8gobDETLWjKU";
// const API_KEY = "AIzaSyDutIptXVtQwUDkJKnZjI4ImyoA1wXueXc";
// const API_KEY = "AIzaSyBPmBbfDBFQS5Hoo7sVnscF-PndQJCRhno";
const API_KEY = "AIzaSyBQYAOT28diXBiMZvY9yPvi4j0TgJl22wM";

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

/////////////////////////////////////////////////////////////////////////////////////

// import OpenAI from "openai";

// const OPENAI_API_KEY =
//   "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";

// // Initialize the OpenAI client
// const openai = new OpenAI({
//   apiKey: OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true, // Only add this if you're calling the API directly from the browser
// });

// export async function connectOpenAIAPI(searchText) {
//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo", // Updated model name
//       messages: [
//         {
//           role: "user",
//           content: searchText,
//         },
//       ],
//       max_tokens: 800,
//     });

//     if (completion.choices && completion.choices.length > 0) {
//       const generatedText = completion.choices[0].message.content.trim();
//       return generatedText;
//     } else {
//       throw new Error("No response from OpenAI API.");
//     }
//   } catch (error) {
//     console.error("Error connecting to OpenAI API:", error);
//     return "No Response from OpenAI, Please Contact Administrator.";
//   }
// }
