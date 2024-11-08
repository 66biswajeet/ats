// src/utils/fetchResumeResponse.js

import { chatSession } from "../gen-ai/Gemini";
import Resume_extract_prompt from "../prompts/Prompts";
import { useResumeContext } from "./ResumeContext";

export const useFetchResumeResponse = () => {
  const { prompt2 } = useResumeContext();

  const fetchResponse = async () => {
    try {
      const resume_response = await chatSession.sendMessage(
        Resume_extract_prompt(prompt2)
      );
      return resume_response.response.text();
    } catch (error) {
      console.error("Error fetching response:", error);
      throw error;
    }
  };

  return fetchResponse;
};
