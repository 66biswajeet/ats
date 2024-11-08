import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import bg_sec2 from "../assets/ats_bg_sec2.jpg";

// use here for file name to show on the popup //
import { useResumeExtract } from "../systems/useResumeExtract";
import { useJdContext } from "../systems/JdContext";

// section & components imports  //
import JobDescription from "../sections/JobDescription";
import Navbtn from "../components/Navbtn";
import Ats_resume_progres from "../sections/Ats_resume_progres";
import AtsResumeSection1 from "../sections/Ats_resume_section1";

// icon imports
import { IoDocumentTextSharp } from "react-icons/io5";
import { IoBarChart } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaBriefcase, FaFileUpload } from "react-icons/fa";
import Footer from "../sections/Footer";

const Ats_resume = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [activePage, setActivePage] = useState("Resume");
  const [currentStep, setCurrentStep] = useState(0);

  const { prompt2, selectedFile, extractText } = useResumeExtract();
  const { prompt1, setPrompt1 } = useJdContext();

  // prompt1 = job description and prompt2 = resume text

  // on upload button click the popup will shown
  const handleUploadClick = () => {
    console.log("Upload button clicked");
    setIsUploadOpen(true);
  };

  useEffect(() => {
    if (prompt1.trim() !== "") {
      setCurrentStep(1);
    }
    if ((prompt1.trim() !== "" && selectedFile) || prompt2.trim() !== "") {
      setCurrentStep(2);
    }
  }, [prompt1, selectedFile]);

  return (
    <>
      <Container>
        <Sidebar>
          <Link to={"/ats/resume"} style={{ textDecoration: "none" }}>
            <SidebarItem
              active={activePage === "Resume"}
              onClick={() => setActivePage("Resume")}
            >
              <Icon>
                <IoDocumentTextSharp />
              </Icon>
              Resume
            </SidebarItem>
          </Link>
          {/* <Link to={"/ats/score"} style={{ textDecoration: "none" }}> */}
          <SidebarItem
            active={activePage === "Score"}
            onClick={() => setActivePage("Score")}
            as={Link}
            to={"/ats/score"}
          >
            <Icon>
              <IoBarChart />
            </Icon>
            Score
          </SidebarItem>
          {/* </Link> */}
          <Link to={"/ats/meter"} style={{ textDecoration: "none" }}>
            <SidebarItem
              active={activePage === "Settings"}
              onClick={() => setActivePage("Settings")}
            >
              <Icon>
                <IoMdSettings />
              </Icon>
              Settings
            </SidebarItem>
          </Link>
        </Sidebar>
        <MainContent>
          <AtsResumeSection1 />
          <Title>Applicant Tracking System</Title>
          <Subtitle>
            Are you not getting enough interview calls? Check your Resume's ATS
            compatibility & get your GAP Report in just 3 minutes. This is your
            chance to get 2X more interview calls.
          </Subtitle>

          <Ats_resume_progres currentStep={currentStep} />

          <JobDescription
            value={prompt1}
            onChange={(e) => setPrompt1(e.target.value)}
          />

          <div id="subtitle" onClick={handleUploadClick}>
            <Navbtn text={"Upload Resume"}> </Navbtn>
          </div>
          <Link to={"/ats/score"}>
            <UploadButton
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Check ATS Score
            </UploadButton>
          </Link>

          {isUploadOpen && (
            <UploadModal
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ModalContent>
                <ModalHeader>
                  <h2>Upload Resume</h2>
                  <CloseButton onClick={() => setIsUploadOpen(false)}>
                    ×
                  </CloseButton>
                </ModalHeader>
                <UploadArea>
                  <UploadIcon>⬆️</UploadIcon>
                  <p>Drop files here</p>
                  <SupportedFormats>Supported format: Pdf </SupportedFormats>
                  <OrDivider>OR</OrDivider>
                  <BrowseButton htmlFor="fileInput">Browse</BrowseButton>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={extractText}
                  />
                  {selectedFile && <p> {selectedFile.name}</p>} 
                  {console.log(selectedFile)}
                </UploadArea>
                <ModalFooter>
                  <CancelButton onClick={() => setIsUploadOpen(false)}>
                    Upload
                  </CancelButton>
                </ModalFooter>
              </ModalContent>
            </UploadModal>
          )}
        </MainContent>
      </Container>
      <Footer />
    </>
  );
};

//.............................// styling section //..........................//

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  margin: auto;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 150px;
  background-color: white;
  color: var(--primary-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  position: fixed;
  left: 18px;

  @media (max-width: 1200px) {
    flex-direction: row;
    top: 0;
    width: 100%;
    justify-content: center;
    left: 0px;
    z-index: 10;
  }
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: ${({ active }) =>
    active ? "var(--fifth-color)" : "transparent"};
  border-radius: 5px;
  color: var(--primary-color);
  text-decoration: none;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Icon = styled.span`
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${bg_sec2});

  background-size: cover;
  background-repeat: no-repeat;

  margin-left: 200px;
  margin-right: auto;
  width: 80%;
  align-items: center;
  padding: 30px;

  /* margin-top: 30vh; */
  justify-content: center;
  scale: 1;
  margin-bottom: 10vh;

  @media (max-width: 1200px) {
    max-width: 100%;
    align-items: center;
    margin-left: auto;
    margin-top: 10vh;
  }
`;

const Title = styled.h1`
  color: var(--primary-color);
  font-weight: 900;
  position: relative;
  padding-bottom: 10px;
  @media (max-width: 1200px) {
    font-size: 15px;
  }

  &::after {
    content: "";
    background: linear-gradient(
      to right,
      var(--primary-color) 0%,
      var(--primary-color) 25%,
      var(--secondary-color) 50%,
      var(--third-color) 75%,

      var(--fourth-color) 100%
    );
    height: 4px;
    background-color: var(--secondary-color);
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  color: var(--third-color);
  max-width: 70%;
  font-size: 15px;
  text-align: center;
  margin-bottom: 30px;
  @media (max-width: 1200px) {
    max-width: 90%;
    text-align: left;
  }
`;

const UploadModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  scale: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  transition: all 1s;
  width: 95%;
  padding: 50px 0;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    background-color: var(--fourth-color);
    border-radius: 50%;
  }
`;

const UploadArea = styled.div`
  border: 2px dashed #ccc;
  border-radius: 5px;
  padding: 40px;
  text-align: center;
`;

const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 10px;
`;

const SupportedFormats = styled.p`
  color: #666;
  font-size: 14px;
`;

const OrDivider = styled.p`
  margin: 10px 0;
  color: #666;
`;

const BrowseButton = styled.label`
  background: none;
  border: none;
  color: var(--secondary-color);
  text-decoration: underline;
  cursor: pointer;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

const CancelButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;
  margin-top: 20px;
  transition: all 0.5s;
  &:hover {
    background-color: var(--fifth-color);
  }
`;

const UploadButton = styled(Button)`
  background-color: var(--primary-color);
  color: white;
  margin-top: 20px;
  transition: all 0.5s;
  margin-left: 50px;
  width: 50vw;
  height: 50px;
  &:hover {
    background-color: var(--secondary-color);
  }

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

// const JobDescriptionInput = styled.textarea`
//   width: 100%;
//   max-width: 600px;
//   height: 150px;
//   padding: 12px;
//   border: 1.5px solid var(--primary-color);
//   border-radius: 8px;
//   font-size: 16px;
//   resize: vertical;
//   margin-bottom: 20px;
//   transition: border-color 0.3s ease;
//   background-color: var(--fifth-color);

//   &:focus {
//     outline: none;
//     border-color: var(--secondary-color);
//     box-shadow: 0 0 0 2px rgba(var(--secondary-color-rgb), 0.2);
//   }

//   &::placeholder {
//     color: var(--primary-color);
//   }

//   @media (max-width: 1000px) {
//     width: 95%;
//   }
// `;

export default Ats_resume;
