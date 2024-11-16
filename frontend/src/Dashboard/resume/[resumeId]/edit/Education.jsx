import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUser } from "@clerk/clerk-react";

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

const EducationInput = () => {
  const [education, setEducation] = useState([
    {
      institueName: "",
      duration: "",
      course: "",
      marks: "",
      heading: "Education",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { resumeId } = useParams();
  const [exp, setExp] = useState();

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(); // State for the filtered resume

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = education.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setEducation(updatedEducation);
  };

  const handleSaveExperience = async () => {
    const resumeData = {
      resumeId: resumeId,
      education: education,
      educationHeading: "Education",
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

  const addNewEducation = () => {
    setEducation([
      ...education,
      {
        instituteName: "",
        duration: "",
        course: "",
        marks: "",
      },
    ]);
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
      setEducation(selectedResume?.education || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchResumes(); // Fetch resumes when the component mounts
  }, [user]);

  return (
    <InputContainer>
      {education.map((edu, index) => (
        <Div key={index} style={{ marginBottom: "20px" }}>
          <Label htmlFor={`instituteName-${index}`}>Institute Name:</Label>
          <StyledInput
            id={`instituteName-${index}`}
            placeholder="Enter the institute name"
            value={edu.instituteName}
            onChange={(e) =>
              handleEducationChange(index, "instituteName", e.target.value)
            }
          />
          <Label htmlFor={`duration-${index}`}>Duration:</Label>
          <StyledInput
            id={`duration-${index}`}
            placeholder="Enter duration"
            value={edu.duration}
            onChange={(e) =>
              handleEducationChange(index, "duration", e.target.value)
            }
          />
          <Label htmlFor={`course-${index}`}>Course:</Label>
          <StyledInput
            id={`course-${index}`}
            placeholder="Enter the Course Title"
            value={edu.course}
            onChange={(e) =>
              handleEducationChange(index, "course", e.target.value)
            }
          />
          <Label htmlFor={`marks-${index}`}>Marks:</Label>
          <StyledInput
            id={`marks-${index}`}
            placeholder="Enter Percentages or cgpa"
            value={edu.marks}
            onChange={(e) =>
              handleEducationChange(index, "marks", e.target.value)
            }
          />
        </Div>
      ))}
      <Button onClick={addNewEducation}>Add New Experience</Button>
      <Button onClick={handleSaveExperience}>Save All Experiences</Button>
    </InputContainer>
  );
};

export default EducationInput;
