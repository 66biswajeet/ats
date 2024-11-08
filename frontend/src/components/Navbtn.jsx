import React from "react";
import styled from "styled-components";
import { FaFileUpload } from "react-icons/fa";

const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  /* border: 2px solid #333;
   */
  border: none;
  border-radius: 15px;
  background: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    max-width: 90%;
  }
  /* 
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    border: 2px solid #333;
    border-radius: 50%;
  } */
  /* 
  &::before {
    top: -15px;
    left: -15px;
    border-color: #333 transparent transparent #333;
  }

  &::after {
    bottom: -15px;
    right: -15px;
    border-color: transparent #333 #333 transparent;
  } */
`;

const InstructionText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #333;
  font-weight: 500;
`;

const Button = styled.button`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 3rem;
  padding: 0 2rem;
  border-radius: 0.5rem;
  background: ${({ bgColor }) => bgColor || "var(--primary-color)"};
  background-size: 400%;
  color: ${({ textColor }) => textColor || "#fff"};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: 0 50%;
    width: 100%;
    height: inherit;
    border-radius: inherit;
    background: ${({ gradient }) =>
      gradient ||
      "linear-gradient(82.3deg, var(--primary-color) 10.8%, var(--third-color) 94.3%)"};
    transition: all 0.475s;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonContent = styled.span`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const DoodleEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: #333;
    opacity: 0.1;
  }

  &::before {
    width: 70px;
    height: 2px;
    top: 10px;
    left: 10px;
    transform: rotate(45deg);
  }

  &::after {
    width: 2px;
    height: 70px;
    bottom: 10px;
    right: 10px;
    transform: rotate(45deg);
  }
`;

const Navbtn = ({ text, textColor, bgColor, gradient, onClick }) => {
  return (
    <ButtonContainer>
      {/* <InstructionText>Upload resume to get started</InstructionText> */}
      <Button
        textColor={textColor}
        bgColor={bgColor}
        gradient={gradient}
        onClick={onClick}
      >
        <ButtonContent>
          <FaFileUpload size={20} />
          {text}
        </ButtonContent>
      </Button>
      {/* <DoodleEffect /> */}
    </ButtonContainer>
  );
};

export default Navbtn;
