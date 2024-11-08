import { useResumeContext } from "./ResumeContext";
import pdfToText from "react-pdftotext";
import { useState } from "react";

export const useResumeExtract = () => {
  const { prompt2, setPrompt2 } = useResumeContext();
  const { selectedFile, setSelectedFile } = useResumeContext();

  const extractText = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file && file.type === "application/pdf") {
      try {
        const text = await pdfToText(file);
        setPrompt2(text);
      } catch (error) {
        console.error("Failed to extract text from pdf:", error);
        setPrompt2("Error: Failed to extract text from PDF");
      }
    } else {
      console.error("Please select a PDF file");
      setPrompt2("Error: Please select a PDF file");
    }
  };

  return { prompt2, selectedFile, extractText };
};
