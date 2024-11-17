import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "@clerk/clerk-react"; // Ensure Clerk is properly set up
import DOMPurify from "dompurify";
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

const Summary = styled.span`
  font-size: 10pt;
  // text-align: center;
  margin-bottom: 5mm;
`;

const Marks = styled.span`
  font-size: 10pt;
  // text-align: center;
  margin-bottom: 5mm;
  margin-left: 10px;
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

const Sk = styled.div`
  border: none;
  padding: 0 5px;
  border-radius: 5px;
  background-color: var(--fifth-color);
  font-size: 15px;
  margin: 5px 5px;
`;

const Skdiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

// Main ResumeTemplate component
const Dummy = () => {
  return (
    <A4Page id="print-area">
      <Header>
        <Name>RICHARD WILLSON</Name>
        <ContactInfo>
          <div>richardwillson@gmail.com</div>
          <div>123, anywhere , anycity</div>
          <div>+1234567890</div>
        </ContactInfo>
      </Header>

      <SectionTitle>Summary</SectionTitle>
      <Summary>
        Dedicated educator with 10 years of experience in science . Proven
        ability to create engaging lessons, inspire students, and foster a
        positive learning environment. Strong communication and classroom
        management skills. Committed to academic excellence and student success.
      </Summary>

      <Section>
        <SectionTitle>Professional Experience</SectionTitle>

        <ExperienceItem>
          <JobDetails>
            <Company>Company Name</Company>

            <span>Time Period</span>
          </JobDetails>
          {/* <Location>{experience.workDone || "Workdone"}</Location> */}
          <Summary>
            Taught science for 5 years at st. javier school. Implemented
            innovative teaching strategies, mentored students, and collaborated
            with colleagues to enhance learning outcomes.
          </Summary>
        </ExperienceItem>
        <ExperienceItem>
          <JobDetails>
            <Company>Company Name</Company>

            <span>Time Period</span>
          </JobDetails>
          {/* <Location>{experience.workDone || "Workdone"}</Location> */}
          <Summary>
            Taught science for 5 years at st. javier school. Implemented
            innovative teaching strategies, mentored students, and collaborated
            with colleagues to enhance learning outcomes.
          </Summary>
        </ExperienceItem>

        <SectionTitle>Qualification</SectionTitle>

        <ExperienceItem>
          <JobDetails>
            <Company> Institute Name</Company>

            <span>Time Period</span>
          </JobDetails>
          {/* <Location>{experience.workDone || "Workdone"}</Location> */}
          <Summary>
            Taught science for 5 years at st. javier school. Implemented
            innovative teaching strategies, mentored students, and collaborated
            with colleagues to enhance learning outcomes.
          </Summary>{" "}
          <Marks>95%</Marks>
        </ExperienceItem>
        <ExperienceItem>
          <JobDetails>
            <Company> Institute Name</Company>

            <span>Time Period</span>
          </JobDetails>
          {/* <Location>{experience.workDone || "Workdone"}</Location> */}
          <Summary>
            Taught science for 5 years at st. javier school. Implemented
            innovative teaching strategies, mentored students, and collaborated
            with colleagues to enhance learning outcomes.
          </Summary>{" "}
          <Marks>95%</Marks>
        </ExperienceItem>

        <SectionTitle>Skills</SectionTitle>
        <Skdiv>
          <Sk>Teaching</Sk>
          <Sk>Teaching</Sk>
          <Sk>Teaching</Sk>
          <Sk>Teaching</Sk>
          <Sk>Teaching</Sk>
        </Skdiv>
      </Section>
    </A4Page>
  );
};

export default Dummy;
