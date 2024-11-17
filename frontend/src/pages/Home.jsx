import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import bg from "../assets/rb2.jpg";

const HeroSection = styled.section`
  /* background-color: var(--fifth-color); */
  padding: 4rem 2rem;
  text-align: center;
  height: 80vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  row-gap: 25px;

  background-image: url(${bg});
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Title = styled.h1`
  color: var(--third-color);
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const glowAnimation = keyframes`
  0% {
    background-position: 200% center;
  }
  100% {
    background-position: -200% center;
  }
`;

const HighlightedText = styled.span`
  color: #3d52a0;
  background: linear-gradient(to right, #3d52a0, #5a6db5, #8da9c4);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
  animation: ${glowAnimation} 6s linear infinite;
`;

const Subtitle = styled.p`
  color: var(--secondary-color);
  font-size: 1.2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #3d52a0;
  color: white;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  color: var(--third-color);
  border: 1px solid var(--third-color);

  &:hover {
    background-color: var(--fifth-color);
  }
`;

const Home = () => {
  return (
    <HeroSection>
      <Title>
        Get dream jobs with our
        <br />
        <HighlightedText>AI Powered</HighlightedText> resume builder
      </Title>
      <Subtitle>
        Build a professional and outstanding resume with our free builder and
        templates.
      </Subtitle>
      <ButtonContainer>
        <Link to="/new_resume">
          <PrimaryButton>Create My Resume</PrimaryButton>
        </Link>
        <Link to="/ats/resume">
          <SecondaryButton>Check ATS</SecondaryButton>
        </Link>
        {/* <SecondaryButton>Parse Resume</SecondaryButton> */}
      </ButtonContainer>
    </HeroSection>
  );
};

export default Home;
