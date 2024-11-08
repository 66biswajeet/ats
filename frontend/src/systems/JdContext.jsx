import React, { createContext, useState, useContext } from "react";

const JdContext = createContext();

export const JdProvider = ({ children }) => {
  const [prompt1, setPrompt1] = useState("");
  const [oldprompt1, setOldprompt1] = useState("");
  const [oldprompt2, setOldprompt2] = useState("");
  const [response, setResponse] = useState("");
  const [prvResponse, setPrvResponse] = useState("");

  return (
    <JdContext.Provider
      value={{
        prompt1,
        setPrompt1,
        oldprompt1,
        setOldprompt1,
        oldprompt2,
        setOldprompt2,
        response,
        setResponse,
        prvResponse,
        setPrvResponse,
      }}
    >
      {children}
    </JdContext.Provider>
  );
};

export const useJdContext = () => useContext(JdContext);
