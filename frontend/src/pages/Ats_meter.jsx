import React, { useState, useEffect, useCallback, useMemo } from "react";
import GaugeMeter from "../components/GaugeMeter";
import styled from "styled-components";
import { chatSession } from "../gen-ai/Gemini";
// import { connectOpenAIAPI } from "../gen-ai/Gemini";
import { useJdContext } from "../systems/JdContext";
import { useResumeContext } from "../systems/ResumeContext";
import JdPrompt from "../prompts/JdPrompt";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  row-gap: 15px;
  position: fixed;
  /* width: 80%; */
  margin-top: 70px;
  background-color: white;
  z-index: -1;
  right: 70px;

  @media (max-width: 1200px) {
    margin: 15px auto 25px auto;
    width: 100%;
    right: 0;
    left: 0;
    justify-content: center;
    align-items: center;
  }

  h2 {
    font-size: 30px;
    font-weight: 700;
    color: var(--primary-color);
    text-align: center;
    margin: 0;
    position: relative;
    margin-bottom: 10px;

    @media (max-width: 1000px) {
      font-size: 25px;
    }
    &::after {
      content: "";
      background: linear-gradient(
        to right,
        var(--primary-color) 0%,
        var(--primary-color) 33.33%,
        var(--third-color) 33.33%,
        var(--third-color) 66.66%,
        var(--fifth-color) 66.66%,
        var(--fifth-color) 100%
      );
      height: 4px;
      background-color: var(--secondary-color);
      position: absolute;
      left: 0;
      top: 100%;
      width: 100%;
      border-radius: 2px;
    }
  }
`;

const Ats_meter = () => {
  const { response, setResponse } = useJdContext();
  const [loading, setLoading] = useState(false);

  const { prvResponse, setPrvResponse } = useJdContext();

  const { prompt1 } = useJdContext();
  const { prompt2 } = useResumeContext();

  const { oldprompt1, setOldprompt1 } = useJdContext();
  const { oldprompt2, setOldprompt2 } = useJdContext();

  ///////////////////////////////////////////////////////////  testing ////////////////////////////////////////////////////

  const handleFetchResponse = useCallback(async () => {
    const fetchResponse = async () => {
      setLoading(true);
      try {
        if (oldprompt1 === prompt1 && oldprompt2 === prompt2) {
          console.log("if cond applied");
          setResponse(prvResponse);
        } else {
          console.log("else cond applied");
          const responses = [];

          for (let i = 0; i < 3; i++) {
            const jd_response = await chatSession.sendMessage(
              JdPrompt(prompt1, prompt2)
            );
            // const jd_response = await connectOpenAIAPI(
            //   JdPrompt(prompt1, prompt2)
            // );
            responses.push(jd_response);
            // responses.push(jd_response.response.text());
            // console.log(jd_response.response.text());
            // console.log(jd_response);
          }

          const thirdResponse = Math.min(
            responses[2].response.text(),
            responses[1].response.text(),
            responses[0].response.text()
            // responses[2],
            // responses[1],
            // responses[0]
          );

          const newResponse = thirdResponse;

          setResponse(newResponse);
          setPrvResponse(newResponse); // Store the new response
          setOldprompt1(prompt1);
          setOldprompt2(prompt2);
        }
      } catch (error) {
        console.error("Error fetching response:", error);
      }
      setLoading(false);
    };

    fetchResponse();
  }, [prompt1, prompt2]);

  useEffect(() => {
    handleFetchResponse();
  }, []);

  ///////////////////////////////////////////////////////////  testing ////////////////////////////////////////////////////

  // useEffect(() => {
  //   const fetchResponse = async () => {
  //     setLoading(true);
  //     try {
  //       const jd_response = await chatSession.sendMessage(
  //         JdPrompt(prompt1, prompt2) // the prompt defind in the Prompts.js file .
  //       );
  //       setResponse(jd_response.response.text()); // response hook have the generated response from the gemini .
  //     } catch (error) {
  //       console.error("Error fetching response:", error);
  //     }
  //     setLoading(false);
  //   };

  //   fetchResponse();
  // }, []);

  // optional (for testing purpose) //

  return (
    <Container>
      <h2>ATS SCORE</h2>
      <GaugeMeter value={loading ? "Calculating.." : response} />
    </Container>
  );
};

export default Ats_meter;
