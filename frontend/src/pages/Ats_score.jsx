import React, { useState, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";

// imported for linking other pages //
import { Link, Navigate } from "react-router-dom";

// gemini api //
import { chatSession } from "../gen-ai/Gemini";

// dynamicly allow prompt2 to travell any where //
import { useJdContext } from "../systems/JdContext";
import { useResumeContext } from "../systems/ResumeContext";
// useResumeContext have prompt2 = extracted resume info //

// use for converting html tags from a string to real tags //
import DOMPurify from "dompurify";

// import the prompt for the resume extraction //
import Resume_extract_prompt from "../prompts/Prompts";

// icon imports
import { IoDocumentTextSharp } from "react-icons/io5";
import { IoBarChart } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

//import components //
import Spinner from "../components/Spinner";

import Ats_meter from "./Ats_meter";
import Footer from "../sections/Footer";

const Ats_score = () => {
  const [activePage, setActivePage] = useState("Score");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmptyPrompt, setIsEmptyPrompt] = useState(false);

  const { prompt1 } = useJdContext();
  const { prompt2 } = useResumeContext(); // now this prompt2 is the same prompt2 as in the useResumeContext file have .

  // responssible for the gemini to take input and give response //

  /////////////////////////////////////////// testing /////////////////////////////////////////////////
  // const handleFetchResponse = useCallback(async () => {
  //   const fetchResponse = async () => {
  //     setLoading(true);
  //     try {
  //       if (oldprompt1 === prompt1 && oldprompt2 === prompt2) {
  //         console.log("if cond applied");
  //         setResponse(prvResponse);
  //         console.log(prvResponse.length);
  //       } else {
  //         console.log("else cond applied");
  //         const jd_response = await chatSession.sendMessage(
  //           JdPrompt(prompt1, prompt2)
  //         );
  //         const newResponse = jd_response.response.text();
  //         setResponse(newResponse);
  //         setPrvResponse(newResponse); // Store the new response
  //         setOldprompt1(prompt1);
  //         setOldprompt2(prompt2);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching response:", error);
  //     }
  //     setLoading(false);
  //   };

  //   fetchResponse();
  // }, [prompt1, prompt2]);

  // useEffect(() => {
  //   handleFetchResponse();
  // }, []);

  /////////////////////////////////////////// testing /////////////////////////////////////////////////
  useEffect(() => {
    if (prompt2.trim() === "" || prompt1.trim() === "") {
      window.alert("Please Give Resume and Jobdescription details first....");
      setIsEmptyPrompt(true);
      return;
    }
    const fetchResponse = async () => {
      setLoading(true);
      try {
        const resume_response = await chatSession.sendMessage(
          Resume_extract_prompt(prompt2) // the prompt defind in the Prompts.js file .
        );
        setResponse(resume_response.response.text()); // response hook have the generated response from the gemini .
      } catch (error) {
        console.error("Error fetching response:", error);
      }
      setLoading(false);
    };

    fetchResponse();
  }, []);

  // optional (for testing purpose) //
  // useEffect(() => {
  //   console.log(response);
  // }, [response]);

  // neccessary for the HTML tag conversion //
  const formatResponse = (text) => {
    return DOMPurify.sanitize(text);
  };

  // everything inside the return statement will be render as HTML //

  return (
    <>
      <Container>
        <Sidebar>
          <Link to={"/ats/resume"} style={{ textDecoration: "none" }}>
            <SidebarItem
              active={activePage === "Resume"}
              onClick={() => setActivePage("Resume")}
            >
              <Icon>
                <IoDocumentTextSharp />
              </Icon>
              Resume
            </SidebarItem>
          </Link>
          <Link to={"/ats/score"} style={{ textDecoration: "none" }}>
            <SidebarItem
              active={activePage === "Score"}
              onClick={() => setActivePage("Score")}
            >
              <Icon>
                <IoBarChart />
              </Icon>
              Score
            </SidebarItem>
          </Link>
          <SidebarItem
            active={activePage === "Settings"}
            onClick={() => setActivePage("Settings")}
          >
            <Icon>
              <IoMdSettings />
            </Icon>
            Settings
          </SidebarItem>
        </Sidebar>

        {isEmptyPrompt ? (
          <Navigate to="/ats/resume" />
        ) : (
          <MainContent>
            {loading ? (
              <>
                <Spinner color="var(--primary-color)" />
              </>
            ) : (
              <>
                <Ats_meter />
                <ContentLayout>
                  {response && (
                    <ResumeLayout>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatResponse(response),
                        }}
                      />
                    </ResumeLayout>
                  )}
                </ContentLayout>
              </>
            )}
          </MainContent>
        )}
      </Container>
      <Footer />
    </>
  );
};

// .........................// styling part //............................................//

// tag 1 //
const Container = styled.div`
  display: flex;
  min-height: 80vh;
  font-family: Arial, sans-serif;

  margin: auto;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

// tag2 //
const Sidebar = styled.div`
  width: 150px;
  background-color: white;
  color: var(--primary-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  position: fixed;
  left: 18px;
  z-index: 0;

  @media (max-width: 1200px) {
    flex-direction: row;
    top: 0;
    width: 100%;
    left: 0px;
    justify-content: center;
  }
`;

// tag3 //

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: ${({ active }) =>
    active ? "var(--fifth-color)" : "transparent"};
  border-radius: 5px;

  color: var(--primary-color);
  text-decoration: none;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// tag4 //
const Icon = styled.span`
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

// tag5 //
const MainContent = styled.div`
  flex-grow: 1;
  padding: 10px;
  margin-left: 220px;
  max-width: 90vw;

  @media (max-width: 1200px) {
    margin-left: 0;
    margin-top: 100px;
    overflow-x: hidden;
    max-width: 100vw;
    padding: 2px;
  }
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  justify-content: flex-start;
  max-width: 95%;

  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

// tag6 //
const ResumeLayout = styled.div`
  max-width: 700px;
  margin: 10px 50px 10px 0px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 30px;

  @media (max-width: 1200px) {
    padding: 30px 5px;

    width: 95vw;
    margin: 200px 10px 10px 10px;
  }

  h2 {
    color: var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  .name {
    font-size: 30px;
    font-weight: 700;
    color: var(--primary-color);
    text-align: center;
    margin: 0;
    position: relative;

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

  h4 {
    color: var(--secondary-color);
    margin-top: 25px;
    margin-bottom: 15px;
    font-size: 20px;
  }

  h5 {
    color: var(--tertiary-color);
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 15px;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .skills {
    border: none;
    padding: 0 5px;
    border-radius: 5px;
    background-color: var(--fifth-color);
    font-size: 15px;
  }

  li {
    margin-bottom: 8px;

    font-size: 10px;
  }

  p {
    line-height: 1.1;
    font-size: 12px;
  }
  a {
    font-size: 12px;
  }
`;

export default Ats_score;
