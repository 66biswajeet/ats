import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
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
  margin: 10px 0;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const SkillsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SkillItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  span {
    font-size: 16px;
    color: var(--third-color);
  }

  button {
    background-color: var(--danger-color);
    color: var(--fifth-color);
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: var(--danger-hover-color);
    }
  }
`;

const SkillsInput = () => {
  const { user } = useUser();
  const { resumeId } = useParams();

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState();

  const fetchSkills = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/new-resume/${user.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch skills");
      }

      const data = await response.json();
      setSkills(data.skills || []);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [user, resumeId]);

  const handleAddSkill = () => {
    if (newSkill.trim() === "") return;

    setSkills((prevSkills) => [...prevSkills, newSkill.trim()]);
    setNewSkill("");
  };

  const handleDeleteSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  const handleSaveSkills = async () => {
    const resumeData = {
      resumeId: resumeId,

      skills: skills,
      skillHeading: "skills",
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
        throw new Error("Failed to save skills");
      }

      console.log("Skills saved successfully");
    } catch (error) {
      console.error("Error saving skills:", error);
    }
  };

  useEffect(() => {
    if (resumes.length > 0) {
      const resume = resumes.find((r) => r.resumeId === resumeId);

      setSelectedResume(resume);
      // if (resume) {
      //   setUserSummary(resume.summary || "");
      //   //  setSummary(response);
      // }
    }
  }, [resumes, resumeId]);

  console.log(useUser);
  console.log(skills);

  return (
    <InputContainer>
      <Label htmlFor="skills">Skills:</Label>
      <StyledInput
        id="skills"
        placeholder="Enter a skill and press Add"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
      />
      <Button onClick={handleAddSkill}>Add Skill</Button>
      <SkillsList>
        {skills.map((skill, index) => (
          <SkillItem key={index}>
            <span>{skill}</span>
            <button onClick={() => handleDeleteSkill(index)}>Delete</button>
          </SkillItem>
        ))}
      </SkillsList>
      <Button onClick={handleSaveSkills}>Save Skills</Button>
    </InputContainer>
  );
};

export default SkillsInput;
