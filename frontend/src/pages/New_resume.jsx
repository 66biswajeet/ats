import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; // Use this if you're handling user data; otherwise, remove it
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Footer from "../sections/Footer";

import { AiFillDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { IoAddCircleSharp } from "react-icons/io5";
import { GiClick } from "react-icons/gi";
import { FaHandPeace } from "react-icons/fa6";

import img from "../assets/meta2.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--fifth-color);
  padding-top: 50px;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 10px;
  text-align: center;
  color: var(--primary-color);
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
  text-align: center;
  color: var(--secondary-color);
`;

const ImagePlaceholder = styled.div`
  background-color: var(--fourth-color);
  border: 2px dashed var(--primary-color);
  border-radius: 15px;
  margin-top: 50px;
  margin-right: 20px;
  width: 220px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    background-color: var(--fifth-color);
  }

  &::before {
    content: "Add Resume";
    position: absolute;
    top: 10px;
    left: 0;
    width: 70%;
    height: 10%;
    background-color: var(--fifth-color);
    opacity: 0.5; // Adjust this value for more/less transparency
    z-index: 1;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    color: var(--primary-color);
    font-weight: 800;
    padding: 0 0 0 10px;
  }
`;

const PlusIcon = styled.div`
  width: 50px;
  height: 50px;
  /* border: 3px solid var(--primary-color); */
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  font-weight: bold;
  color: var(--primary-color);
`;

const Pc = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(19, 64, 116, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  border-radius: 15px;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: var(--fifth-color);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  height: 40px;
  border-radius: 8px;
  border: 2px solid var(--fourth-color);
  background-color: white;
  padding: 10px;
  margin: 15px 0;
  font-size: 16px;
  color: var(--third-color);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Close = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  color: #333;
  font-size: 16px;
  font-weight: normal;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--fourth-color);
  }

  &:active {
    background-color: #dee2e6;
  }

  &:first-of-type {
    margin-top: 20px;
  }
`;

const Button = styled.button`
  text-decoration-line: none;
  text-align: center;
  height: 40px;
  border-radius: 8px;
  border: none;
  padding: 0 20px;
  margin: auto 0;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;

  ${(props) =>
    props.primary
      ? `
    background-color: var(--primary-color);
    color: var(--fifth-color);

    &:hover {
      background-color: var(--third-color);
    }
  `
      : `
    background-color: var(--fourth-color);
    color: var(--third-color);

    &:hover {
      background-color: var(--fifth-color);
    }
  `}
`;

const ResumeCard = styled.div`
  /* background-color: white;
  border: 1px solid var(--fourth-color);
  border-radius: 15px;
  padding: 20px;
  margin: 15px;
  width: 220px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-image: url(${img});
  background-position: center;
  background-size: cover; */

  position: relative;
  background-color: white;
  border: 1px solid var(--fourth-color);
  border-radius: 15px;
  padding: 20px;
  margin: 15px;
  width: 220px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden; // Ensures the pseudo-element stays within the card bounds

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${img});
    background-position: center;
    background-size: 50%;
    background-repeat: no-repeat;
    opacity: 0.15; // Adjust this value for more/less transparency
    z-index: 1;
  }

  // Ensure content is above the background image
  * {
    position: relative;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ResumeTitle = styled.h3`
  font-size: 20px;
  color: var(--primary-color);
  margin-bottom: 10px;
  text-align: center;
`;

const ResumeDate = styled.p`
  font-size: 14px;
  color: var(--secondary-color);
  margin-bottom: 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ResumeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const Placeholder = styled.div`
  color: var(--secondary-color);
  font-size: 40px;
  font-weight: bold;
  text-align: center;

  background-color: white;
  width: 60%;
  padding: 10px 0;
  border-radius: 20px;

  margin: 0 auto;
`;

const New_resume = () => {
  const { user } = useUser(); // Optional if you're using Clerk for authentication
  const [isOpen, setIsOpen] = useState(false);

  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteId, setIsDeleteId] = useState();

  const [resumeTitle, setResumeTitle] = useState("");
  const [resumes, setResumes] = useState([]);

  const [isEmptyTitle, setIsEmptyTitle] = useState(false);

  const navigate = useNavigate();

  const empty=()=>{
    // if(resumeTitle.trim()=== ""){
      window.alert("Please enter a Resume Title first...");
      setIsEmptyTitle(true);
      setIsOpen(false);
      return;
    //}
  }

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleDelete = (r) => {
    setIsDelete(true);
    setIsDeleteId(r);
    return r;
  };

  const resumeId = uuidv4();
  const handleCreateResume = async () => {
    const resumeData = {
      userId: user ? user.id : "guest",
      resumeId: resumeId,
      resumeName: resumeTitle,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/new-resume/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resumeData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create resume");
      }

      console.log("Resume created successfully");

      console.log(resumeData);

      setResumeTitle("");
      setIsOpen(false);

      navigate(`/dashboard/resume/${resumeData.resumeId}/edit`);
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  const fetchResumes = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/new-resume/${user.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch resumes");
      }

      const data = await response.json();
      const sortedResumes = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setResumes(sortedResumes); // Update the state with the sorted resumes
      // setResumes(data); // Update the state with the fetched resumes
      console.log(data.resumeName);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchResumes(); // Fetch resumes when the component mounts
  }, [user]);

  const handleDeleteResume = async (resumeId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/new-resume/${user.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resumeId }), // Pass resumeId in the request body
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete resume");
      }

      // Remove the deleted resume from the state
      setResumes(resumes.filter((resume) => resume.resumeId !== resumeId));
      console.log("Resume deleted successfully");
      setIsDelete(false);
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };
  const isEmpty = resumes.length === 0;
  return (
    <>
      <Container>
        <Title>
          Welcome {user ? user.firstName : "Guest"} <FaHandPeace />
        </Title>
        <Subtitle>
          Start Creating your AI resume for your next Job role
        </Subtitle>
        {isEmpty && (
          <Placeholder>
            <GiClick />
            Click to add your very first resume
          </Placeholder>
        )}
        <Cards>
          <ImagePlaceholder onClick={handleClick}>
            <PlusIcon>
              <IoAddCircleSharp />
            </PlusIcon>
          </ImagePlaceholder>
          {isOpen && (
            <Pc>
              <Popup>
                <Title>Enter Resume Title</Title>
                <Input
                  type="text"
                  placeholder="Example: MyResume1"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                />

                <Close onClick={(resumeTitle.trim()=== "") ? empty : handleCreateResume}>Create</Close>
                <Close onClick={() => setIsOpen(false)}>Close</Close>
              </Popup>
            </Pc>
          )}

          {isDelete && (
            <Pc>
              <Popup>
                <Title>
                  {" "}
                  Are you sure you want to permanently delete the selected
                  Resume?{" "}
                </Title>
                <Close onClick={() => handleDeleteResume(isDeleteId)}>
                  Delete
                </Close>
                <Close onClick={() => setIsDelete(false)}>Cancel</Close>
              </Popup>
            </Pc>
          )}

          <ResumeList>
            {resumes.map((resume) => (
              <div key={resume.resumeId}>
                <ResumeCard>
                  <ResumeDate>
                    Last Updated : <br></br>{" "}
                    {new Date(
                      resume.updatedAt || resume.createdAt
                    ).toLocaleString()}
                  </ResumeDate>

                  <ResumeTitle>{resume.resumeName}</ResumeTitle>

                  <Subtitle>You can edit or delete resume</Subtitle>

                  <ButtonGroup>
                    <Button
                      as={Link}
                      to={`/dashboard/resume/${resume.resumeId}/edit`}
                      primary
                    >
                      <GrEdit />. Edit
                    </Button>

                    {/* <Button onClick={() => handleDeleteResume(resume.resumeId)}> */}
                    <Button onClick={() => handleDelete(resume.resumeId)}>
                      <AiFillDelete /> Delete
                    </Button>
                  </ButtonGroup>
                </ResumeCard>
              </div>
            ))}{" "}
          </ResumeList>
        </Cards>
      </Container>
      <Footer />
    </>
  );
};

export default New_resume;
