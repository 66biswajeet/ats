import React, { createContext, useState, useContext } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [prompt2, setPrompt2] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <ResumeContext.Provider
      value={{ prompt2, setPrompt2, selectedFile, setSelectedFile }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => useContext(ResumeContext);
