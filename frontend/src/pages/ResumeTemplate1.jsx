import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "@clerk/clerk-react"; // Ensure Clerk is properly set up

// Styled Components
const A4Page = styled.div`
  width: 178mm;
  padding: 2mm 10mm;
  margin: 2mm auto;
  background: white;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 5mm;
`;

const Name = styled.h1`
  color: #003366;
  font-size: 24pt;
  margin-bottom: 2mm;
`;

const ContactInfo = styled.div`
  font-size: 10pt;
  color: #333;
`;

const Summary = styled.p`
  font-size: 10pt;
  text-align: center;
  margin-bottom: 5mm;
`;

const Section = styled.section`
  margin-bottom: 5mm;
`;

const SectionTitle = styled.h2`
  color: #003366;
  font-size: 12pt;
  border-bottom: 1px solid #003366;
  margin-bottom: 3mm;
`;

const ExperienceItem = styled.div`
  margin-bottom: 4mm;
`;

const JobTitle = styled.h3`
  font-size: 11pt;
  font-weight: bold;
  margin-bottom: 1mm;
`;

const JobDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10pt;
  margin-bottom: 1mm;
`;

const Company = styled.span`
  font-weight: bold;
`;

const Location = styled.span``;

const BulletList = styled.ul`
  margin: 0;
  padding-left: 5mm;
`;

const BulletItem = styled.li`
  font-size: 10pt;
  margin-bottom: 1mm;
`;

const Education = styled.div`
  font-size: 10pt;
`;

// Main ResumeTemplate component
const ResumeTemplate = () => {
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
    <A4Page>
      <Header>
        <Name>{selectedResume.candidateName || "Lorem Ipsum"}</Name>
        <ContactInfo>
          <div>{selectedResume.candidateEmail || "lorem@mail.com"}</div>
          <div>
            {selectedResume.candidateAddress || "lorem Colony, Near lorem Gate"}
          </div>
          <div>{selectedResume.candidatePhone || "0000011111"}</div>
        </ContactInfo>
      </Header>

      <SectionTitle>{selectedResume.summaryHeading}</SectionTitle>
      <Summary>{selectedResume.summary}</Summary>

      <Section>
        {/* <SectionTitle>PROFESSIONAL EXPERIENCE</SectionTitle> */}
        {/* {selectedResume.experience &&
          selectedResume.experience.map((job, index) => (
            <ExperienceItem key={index}>
              <JobTitle>{job.jobTitle}</JobTitle>
              <JobDetails>
                <Company>{job.company},</Company>
                <Location>{job.location}</Location>
              </JobDetails>
              <div>{job.date}</div>
              <BulletList>
                {job.bullets.map((bullet, i) => (
                  <BulletItem key={i}>{bullet}</BulletItem>
                ))}
              </BulletList>
            </ExperienceItem>
          ))} */}
      </Section>

      <Section>
        {/* <SectionTitle>EDUCATION</SectionTitle> */}
        {/* <Education>
          <strong>{selectedResume.education.school}</strong>,{" "}
          {selectedResume.education.location}
          <br /> {selectedResume.education.degree}
          <br /> Honors: {selectedResume.education.honors}
          <br /> {selectedResume.education.date}
        </Education> */}
      </Section>

      <Section>
        {/* <SectionTitle>ADDITIONAL SKILLS</SectionTitle> */}
        {/* <BulletList>
          {selectedResume.skills.map((skill, index) => (
            <BulletItem key={index}>{skill}</BulletItem>
          ))}
        </BulletList> */}
      </Section>
    </A4Page>
  );
};

export default ResumeTemplate;
