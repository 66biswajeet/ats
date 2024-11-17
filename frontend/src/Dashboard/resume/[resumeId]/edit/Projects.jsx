import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUser } from "@clerk/clerk-react";
import { chatSession } from "../../../../gen-ai/Gemini";
// import { connectOpenAIAPI } from "../../../../gen-ai/Gemini";
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

const StyledInputText = styled.textarea`
  padding: 10px;
  border: 1px solid var(--fourth-color);
  border-radius: 4px;
  font-size: 16px;
  color: var(--third-color);
  background-color: var(--fifth-color);
  transition: border-color 0.3s ease;
  height: 150px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      heading: "",
      description: "",

      mainheading: "Projects",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { resumeId } = useParams();
  const [exp, setExp] = useState();

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(); // State for the filtered resume

  const handleProjectsChange = (index, field, value) => {
    const updatedProjects = projects.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setProjects(updatedProjects);
  };

  //   const generateResponse = async (index) => {
  //     setLoading(true);
  //     try {
  //       const experience = experiences[index];
  //       const experienceResponse = await chatSession.sendMessage(
  //         experiencePrompt(experience.workDone)
  //       );
  //       // const experienceResponse = await connectOpenAIAPI(
  //       //   experiencePrompt(experience.workDone)
  //       // );
  //       const sanitizedResponse = DOMPurify.sanitize(
  //         experienceResponse.response.text()
  //         // experienceResponse
  //       );

  //       const updatedExperiences = experiences.map((exp, i) =>
  //         i === index ? { ...exp, fresponse: sanitizedResponse } : exp
  //       );
  //       setExperiences(updatedExperiences);
  //     } catch (error) {
  //       console.error("Error fetching response:", error);
  //     }
  //     setLoading(false);
  //   };

  const handleSaveProjects = async () => {
    const resumeData = {
      resumeId: resumeId,
      projects: projects,
      projectsHeading: "Projects",
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
        throw new Error("Failed to save experiences");
      }
    } catch (error) {
      console.error("Error saving experiences:", error);
    }
  };

  const addNewProjects = () => {
    setProjects([...projects, { heading: "", description: "" }]);
  };

  const fetchResumes = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/new-resume/${user.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch resumes");
      }

      const data = await response.json();
      setResumes(data); // Update the state with the fetched resumes
      const selectedResume = data.find(
        (resume) => resume.resumeId === resumeId
      );
      setProjects(selectedResume?.projects || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchResumes(); // Fetch resumes when the component mounts
  }, [user]);

  return (
    <InputContainer>
      {projects.map((project, index) => (
        <Div key={index} style={{ marginBottom: "20px" }}>
          <Label htmlFor={`heading-${index}`}>Heading:</Label>
          <StyledInput
            id={`heading-${index}`}
            placeholder="Enter Project Heading "
            value={project.heading}
            onChange={(e) =>
              handleProjectsChange(index, "heading", e.target.value)
            }
          />
          <Label htmlFor={`description-${index}`}>Description:</Label>
          <StyledInput
            id={`description-${index}`}
            placeholder="Enter Project Description"
            value={project.description}
            onChange={(e) =>
              handleProjectsChange(index, "description", e.target.value)
            }
          />
        </Div>
      ))}
      <Button onClick={addNewProjects}>Add New Experience</Button>
      <Button onClick={handleSaveProjects}>Save All Experiences</Button>
    </InputContainer>
  );
};

export default Projects;
