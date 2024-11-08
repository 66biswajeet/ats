import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import styled from "styled-components";

import CandidateInfo from "./CandidateInfo";
import ResumeSummaryInput from "./Summary";

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 10px;
`;

const Question = styled.div`
  background-color: #8da9c4;
  color: #134074;
  padding: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Answer = styled.div`
  background-color: #eef4ed;
  padding: 15px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const EditResume = () => {
  const [openSection, setOpenSection] = useState(null);
  const [candidateInfo, setCandidateInfo] = useState({
    candidateName: "",
    candidateEmail: "",
    candidateAddress: "",
    candidateNumber: "",
    summary: "",
  });

  const { user } = useUser();
  const [selectedResume, setSelectedResume] = useState(null);
  const [summary, setSummary] = useState("");
  const { resumeId } = useParams();

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const handleEditResumes = async () => {
    if (!user || !resumeId) return;

    const resumeData = {
      resumeId: resumeId,
      ...candidateInfo,
      summaryHeading: "Summary",
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
        throw new Error("Failed to edit resume");
      }

      console.log("Resume updated:", resumeData);
      // You might want to show a success message to the user here
    } catch (error) {
      console.error("Error editing resume:", error);
      // You might want to show an error message to the user here
    }
  };

  useEffect(() => {
    const fetchResume = async () => {
      if (!user || !resumeId) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/new-resume/${user.id}/${resumeId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch resume");
        }

        const data = await response.json();
        setSelectedResume(data);
        setCandidateInfo({
          candidateName: data.candidateName || "",
          candidateEmail: data.candidateEmail || "",
          candidateAddress: data.candidateAddress || "",
          candidateNumber: data.candidateNumber || "",
          summary: data.summary || "",
        });
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    fetchResume();
  }, [user, resumeId]);

  return (
    <Container2>
      <Section>
        <Question onClick={() => toggleSection(0)}>
          Candidate Basic Details
          {openSection === 0 ? "-" : "+"}
        </Question>
        <Answer isOpen={openSection === 0}>
          <CandidateInfo
            candidateInfo={candidateInfo}
            setCandidateInfo={setCandidateInfo}
            handleEditResumes={handleEditResumes}
            selectedResumeId={resumeId}
          />
        </Answer>
      </Section>
      <Section>
        <Question onClick={() => toggleSection(0)}>
          Candidate Summary
          {openSection === 0 ? "-" : "+"}
        </Question>
        <Answer isOpen={openSection === 0}>
          <ResumeSummaryInput
            summary={summary}
            setSummary={setSummary}
            handleEditResumes={handleEditResumes}
          />
        </Answer>
      </Section>
    </Container2>
  );
};

export default EditResume;
