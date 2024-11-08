import React from "react";
import styled from "styled-components";
import ats from "../assets/ats.png";
import { motion, AnimatePresence } from "framer-motion";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: var(--primary-color);
  /* background: linear-gradient(
    to right,
    var(--secondary-color) 0%,
    var(--secondary-color) 60%,
    var(--primary-color) 60%,
    var(--primary-color) 100%
  ); */
  /* background-image: url("https://media.istockphoto.com/id/1198272365/photo/colorful-wavy-object.webp?s=2048x2048&w=is&k=20&c=Ca-s6BK4WXLw0YadRevbKkjJU4-vhIVx9m3Rd-ZhVsw="); */

  background-size: cover;
  color: white;
  width: 98%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem 5%;
    margin-left: 45px;
  }
`;

const Content = styled.div`
  flex: 1;
  text-align: center;
  margin-bottom: 0;

  @media (min-width: 768px) {
    text-align: left;
    margin-bottom: 0;
  }
`;

const Heading = styled.h2`
  font-size: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const ScanButton = styled.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--third-color);
  }
`;

const IllustrationContainer = styled.div`
  position: relative;

  display: none;

  @media (min-width: 1200px) {
    width: 500px;
    height: 300px;
    display: block;
    background-image: url(${ats});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const Mountain = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 80px solid transparent;
  border-right: 80px solid transparent;
  border-bottom: 160px solid var(--fourth-color);

  @media (min-width: 768px) {
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-bottom: 200px solid var(--fourth-color);
  }
`;

const Person = styled.div`
  position: absolute;
  bottom: 0;
  left: 20%;
  width: 20px;
  height: 40px;
  background-color: var(--fifth-color);
  border-radius: 50% 50% 0 0;

  &::before {
    content: "";
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 24px;
    background-color: var(--fifth-color);
    border-radius: 50%;
  }

  @media (min-width: 768px) {
    width: 50px;
    height: 100px;

    &::before {
      top: -20px;
      width: 30px;
      height: 30px;
    }
  }
`;

const Sun = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: var(--secondary-color);
  border-radius: 50%;

  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const Cloud = styled.div`
  position: absolute;
  top: 40px;
  left: 20px;
  width: 60px;
  height: 24px;
  background-color: var(--fifth-color);
  border-radius: 12px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: var(--fifth-color);
    border-radius: 50%;
  }

  &::before {
    width: 40px;
    height: 40px;
    top: -20px;
    left: 8px;
  }

  &::after {
    width: 56px;
    height: 56px;
    top: -28px;
    right: 8px;
  }

  @media (min-width: 768px) {
    width: 100px;
    height: 30px;
    border-radius: 15px;

    &::before {
      width: 50px;
      height: 50px;
      top: -25px;
      left: 10px;
    }

    &::after {
      width: 70px;
      height: 70px;
      top: -35px;
      right: 10px;
    }
  }
`;

const AtsResumeSection1 = ({ href }) => {
  const handleButtonClick = () => {
    document.getElementById("subtitle").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section>
      <Content>
        <Heading>Find Out Your Resume Score In Seconds</Heading>
        <ScanButton
          onClick={handleButtonClick}
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Scan Your Resume
        </ScanButton>
      </Content>
      <IllustrationContainer>
        {/* <Mountain />
        <Person />
        <Sun />
        <Cloud /> */}
      </IllustrationContainer>
    </Section>
  );
};

export default AtsResumeSection1;
