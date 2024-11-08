import React from "react";
import styled, { keyframes, css } from "styled-components";

const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 25px auto;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(33, 150, 243, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(33, 150, 243, 0);
  }
`;

const StepCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? "var(--secondary-color)" : "#E0E0E0"};
  color: ${(props) => (props.active ? "white" : "#757575")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-bottom: 8px;
  transition: background-color 0.3s ease;

  ${(props) =>
    props.active &&
    css`
      animation: ${pulse} 1.5s infinite;
    `}
`;

const StepText = styled.span`
  color: ${(props) => (props.active ? "#2196F3" : "#757575")};
  font-size: 10px;
  transition: color 0.3s ease;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 2px;
  background-color: #e0e0e0;
  margin: 0 10px;
`;

const Ats_resume_progres = ({ currentStep }) => {
  return (
    <ProgressContainer>
      <Step>
        <StepCircle active={currentStep >= 1}>1</StepCircle>
        <StepText active={currentStep >= 1}>Upload Resume</StepText>
      </Step>
      <Line />
      <Step>
        <StepCircle active={currentStep >= 2}>2</StepCircle>
        <StepText active={currentStep >= 2}>Add Job</StepText>
      </Step>
      <Line />
      <Step>
        <StepCircle active={currentStep >= 3}>3</StepCircle>
        <StepText active={currentStep >= 3}>View Results</StepText>
      </Step>
    </ProgressContainer>
  );
};

export default Ats_resume_progres;
