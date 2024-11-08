// ResumeSummaryInput.js

import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

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

const StyledInput = styled.textarea`
  padding: 10px;
  border: 1px solid var(--fourth-color);
  border-radius: 4px;
  font-size: 16px;
  color: var(--third-color);
  background-color: var(--fifth-color);
  transition: border-color 0.3s ease;
  height: 100px;

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

const ResumeSummaryInput = () => {
  const [summary, setSummary] = useState("");

  const { user } = useUser();
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(); // State for the filtered resume
  const { resumeId } = useParams();

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
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchResumes(); // Fetch resumes when the component mounts
  }, [user]);

  const handleEditResumes = async (section) => {
    const resumeData = {
      resumeId: resumeId,

      summary: summary,
      summaryHeading: "Summary",
    };

    //  let dataToUpdate = {};
    //  if (section === "summary") {
    //    dataToUpdate = summaryData;
    //  } else if (section === "candidateInfo") {
    //    dataToUpdate = resumeData;
    //  }

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
        throw new Error("Failed to edit resume");
      }

      console.log(resumeData);
      console.log(summaryData);

      // navigate(`/dashboard/resume/${resumeData.resumeId}/edit`);
    } catch (error) {
      console.error("Error editing resume:", error);
    }
  };

  useEffect(() => {
    if (resumes.length > 0) {
      const resume = resumes.find((r) => r.resumeId === resumeId);

      setSelectedResume(resume);
      if (resume) {
        setSummary(resume.summary);
      }
    }
  }, [resumes, resumeId]);

  return (
    <InputContainer>
      <Label htmlFor="summary">Summary:</Label>
      <StyledInput
        id="summary"
        placeholder="Enter your Summary:"
        value={summary}
        onChange={(e) => setSummary(e.target.value)} // Directly handle input change
      />
      <Button onClick={handleEditResumes}>Save</Button>
    </InputContainer>
  );
};

export default ResumeSummaryInput;
