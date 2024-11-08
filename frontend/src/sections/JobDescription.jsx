import React from "react";
import styled, { keyframes } from "styled-components";

const JobDescriptionContainer = styled.div`
  position: relative;
  width: 60%;
  margin: 30px auto;
  left: 0;
  @media (max-width: 1000px) {
    width: 80%;
    margin: 30px 5px;
  }
`;

const JobDescriptionInput = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 20px;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  background-color: var(--fifth-color);
  font-size: 16px;
  color: var(--primary-color);
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 15px rgba(112, 145, 230, 0.3);
  }

  &::placeholder {
    color: var(--third-color);
  }
  @media (max-width: 1000px) {
    padding: 20px 5px;
  }
`;

const DoodleDecoration = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 15px;
  pointer-events: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border: 2px solid var(--fourth-color);
    border-radius: 50%;
  }

  &::before {
    top: -5px;
    left: -5px;
    width: 30px;
    height: 30px;
    border-top-color: var(--secondary-color);
    border-right-color: var(--secondary-color);
  }

  &::after {
    bottom: -5px;
    right: -5px;
    width: 40px;
    height: 40px;
    border-bottom-color: var(--third-color);
    border-left-color: var(--third-color);
  }
`;

const JobDescriptionLabel = styled.label`
  position: absolute;
  top: -12px;
  left: 20px;
  background-color: var(--fifth-color);
  padding: 0 10px;
  font-size: 14px;
  color: var(--secondary-color);
  font-weight: bold;
`;

const JobDescription = ({ value, onChange }) => {
  return (
    <>
      <JobDescriptionContainer>
        <JobDescriptionLabel>
          Job Description | OR | Job Role
        </JobDescriptionLabel>

        <JobDescriptionInput
          placeholder="Paste the job description OR job role here...  "
          value={value}
          onChange={onChange}
        />
        <DoodleDecoration />
      </JobDescriptionContainer>
    </>
  );
};

export default JobDescription;
