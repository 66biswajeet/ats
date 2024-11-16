// ResumeInputFields.js

import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 30px;
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
  margin: 0 20px;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const CandidateInfo = () => {
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidateAddress, setCandidateAddress] = useState("");
  const [candidateNumber, setCandidateNumber] = useState("");

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
      candidateName: candidateName,
      candidateEmail: candidateEmail,
      candidateAddress: candidateAddress,
      candidateNumber: candidateNumber,
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
      setCandidateName("");
      setCandidateEmail("");
      setCandidateAddress("");
      setCandidateNumber("");
      setSummary("");

      // navigate(`/dashboard/resume/${resumeData.resumeId}/edit`);
    } catch (error) {
      console.error("Error editing resumes:", error);
    }
  };

  useEffect(() => {
    if (resumes.length > 0) {
      const resume = resumes.find((r) => r.resumeId === resumeId);
      setSelectedResume(resume);
      if (resume) {
        setCandidateName(resume.candidateName || "");
        setCandidateEmail(resume.candidateEmail || "");
        setCandidateAddress(resume.candidateAddress || "");
        setCandidateNumber(resume.candidateNumber || "");
      }
    }
  }, [resumes, resumeId]);

  return (
    <>
      <InputContainer>
        <Label htmlFor="candidateName">Candidate Name:</Label>
        <StyledInput
          id="candidateName"
          type="text"
          placeholder="Enter Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)} // Use direct setter here
        />
      </InputContainer>

      <InputContainer>
        <Label htmlFor="candidateEmail">Candidate Email:</Label>
        <StyledInput
          id="candidateEmail"
          type="email"
          placeholder="Enter Candidate Email"
          value={candidateEmail}
          onChange={(e) => setCandidateEmail(e.target.value)} // Use direct setter here
        />
      </InputContainer>

      <InputContainer>
        <Label htmlFor="candidateAddress">Candidate Address:</Label>
        <StyledInput
          id="candidateAddress"
          type="text"
          placeholder="Enter Candidate Address"
          value={candidateAddress}
          onChange={(e) => setCandidateAddress(e.target.value)} // Use direct setter here
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="candidateNumber">Candidate Phone Number:</Label>
        <StyledInput
          id="candidateNumber"
          type="text"
          placeholder="Enter Candidate Phone Number"
          value={candidateNumber}
          onChange={(e) => setCandidateNumber(e.target.value)} // Use direct setter here
        />
      </InputContainer>

      <Button onClick={handleEditResumes}>Save</Button>
      {/* <Link to={`/dashboard/resume/${selectedResumeId}/edit/summary`}>
        <Button>Next</Button>
      </Link> */}
    </>
  );
};

export default CandidateInfo;
