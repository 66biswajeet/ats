import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUser } from "@clerk/clerk-react";
import { chatSession } from "../../../../gen-ai/Gemini";
import experiencePrompt from "../../../../prompts/experience_prompt";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: var(--third-color);
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid var(--fourth-color);
  border-radius: 4px;
  font-size: 16px;
  color: var(--third-color);
  background-color: var(--fifth-color);
  transition: border-color 0.3s ease;
  height: 30px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: var(--fifth-color);
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px 20px;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const ExperienceInput = () => {
  const [companyName, setCompanyName] = useState("");
  const [timeWorked, setTimeWorked] = useState("");
  const [workDone, setWorkDone] = useState("");
  const [fresponse, setFresponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [resumes, setResumes] = useState("");
  const [selectedResume, setSelectedResume] = useState();

  const { user } = useUser();
  const { resumeId } = useParams();

  const generateResponse = async () => {
    setLoading(true);
    try {
      const experienceResponse = await chatSession.sendMessage(
        experiencePrompt(companyName, timeWorked, workDone)
      );
      setFresponse(DOMPurify.sanitize(experienceResponse.response.text()));
      console.log(fresponse);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
    setLoading(false);
  };

  // const fetchResumes = async () => {
  //   if (!user) return;

  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/new-resume/${user.id}`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch resumes");
  //     }

  //     const data = await response.json();
  //     setResumes(data); // Update the state with the fetched resumes
  //   } catch (error) {
  //     console.error("Error fetching resumes:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchResumes(); // Fetch resumes when the component mounts
  // }, [user]);

  const handleSaveExperience = async () => {
    const resumeData = {
      resumeId: resumeId,
      experience: fresponse,
      // response:
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/new-resume/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resumeData }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save experience");
      }

      // Optionally, you can navigate to a different page or update the UI
      // after successfully saving the experience
    } catch (error) {
      console.error("Error saving experience:", error);
    }
  };

  // useEffect(() => {
  //   if (resumes.length > 0) {
  //     const resume = resumes.find((r) => r.resumeId === resumeId);

  //     setSelectedResume(resume);
  //   }
  // }, [resumes, resumeId]);

  return (
    <InputContainer>
      <Label htmlFor="companyName">Company Name:</Label>
      <StyledInput
        id="companyName"
        placeholder="Enter the company name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <Label htmlFor="timeWorked">Time Worked:</Label>
      <StyledInput
        id="timeWorked"
        placeholder="Enter the time worked"
        value={timeWorked}
        onChange={(e) => setTimeWorked(e.target.value)}
      />
      <Label htmlFor="workDone">Work Done:</Label>
      <StyledInput
        id="workDone"
        placeholder="Enter the work done"
        value={workDone}
        onChange={(e) => setWorkDone(e.target.value)}
      />
      <Button onClick={generateResponse}>Generate with AI</Button>
      <Button onClick={handleSaveExperience}>Save</Button>
      {fresponse && (
        <div className="border p-4 rounded">
          <p dangerouslySetInnerHTML={{ __html: fresponse }}></p>
        </div>
      )}
    </InputContainer>
  );
};

export default ExperienceInput;
