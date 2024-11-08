import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "@clerk/clerk-react"; // Ensure Clerk is properly set up

// Styled Components
const ResumeContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #003366;
  color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px 8px 0 0;
`;

const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
`;

const ContactInfo = styled.div`
  font-size: 1rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 0 0 8px 8px;
`;

const SectionTitle = styled.h2`
  color: #003366;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Summary = styled.p`
  font-size: 1rem;
  color: #444444;
`;

// Main ResumeTemplate2 component
const ResumeTemplate2 = () => {
  const { user } = useUser(); // Get user object from Clerk
  const { resumeId } = useParams(); // Destructure resumeId from params
  const [resumeData, setResumeData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      if (!user.id) {
        setError("No user is currently logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/new-resume/${user.id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch resumes");
        }
        const data = await response.json();
        setResumeData(data); // Set the fetched data
      } catch (error) {
        console.error("Error fetching resume data:", error);
        setError("Error fetching resume data.");
      } finally {
        setLoading(false); // Done loading
      }
    };

    // Fetch resume data on component mount
    fetchResumeData();

    // Set an interval for polling (e.g., every 5 seconds)
    const intervalId = setInterval(() => {
      fetchResumeData();
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [user]);

  // Effect to set the selected resume based on resumeId
  useEffect(() => {
    if (resumeData.length > 0) {
      // Find the resume that matches the resumeId from params
      const resume = resumeData.find((r) => r.resumeId === resumeId);
      setSelectedResume(resume); // Set the selected resume in state
    }
  }, [resumeData, resumeId]);

  if (loading) {
    return <p>Loading resume...</p>; // Show loading message
  }

  if (error) {
    return <p>{error}</p>; // Show error message if any
  }

  if (!selectedResume) {
    return <p>No resume data available</p>; // Fallback if no data is found
  }

  // Render resume data
  return (
    <ResumeContainer>
      <Header>
        <Name>{selectedResume.candidateName}</Name>
        <ContactInfo>
          <div>{selectedResume.candidateEmail}</div>
          <div>{selectedResume.candidateAddress}</div>
          <div>{selectedResume.candidatePhone}</div>
        </ContactInfo>
      </Header>

      <Section>
        <SectionTitle>Summary</SectionTitle>
        <Summary>{selectedResume.summary}</Summary>
      </Section>
    </ResumeContainer>
  );
};

export default ResumeTemplate2;
