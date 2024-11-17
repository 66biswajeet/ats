import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "@clerk/clerk-react"; // Ensure Clerk is properly set up
import DOMPurify from "dompurify";
import ResumeTemplate from "../../../../pages/ResumeTemplate1";
import { FaDownload } from "react-icons/fa";

const Download = () => {
  const { user } = useUser(); // Get user object from Clerk
  const { resumeId } = useParams(); // Destructure resumeId from params
  const [resumeData, setResumeData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedResume, setSelectedResume] = useState(null);

  const Div = styled.div`
    margin: 40px 0 0 0;
  `;

  const Button = styled.button`
    margin: 30px;
    position: relative;
    left: 44%;
    background-color: var(--primary-color);
    color: var(--fifth-color);
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--secondary-color);
    }
  `;

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
    // const intervalId = setInterval(() => {
    //   fetchResumeData();
    // }, 5000);

    // // Clear interval on component unmount
    // return () => clearInterval(intervalId);
  }, [user]);

  const handleClick = () => {
    window.print();
  };
  // Effect to set the selected resume based on resumeId
  useEffect(() => {
    if (resumeData.length > 0) {
      // Find the resume that matches the resumeId from params
      const resume = resumeData.find((r) => r.resumeId === resumeId);
      setSelectedResume(resume); // Set the selected resume in state
    }
  }, [resumeData, resumeId]);

  return (
    <Div key={resumeId}>
      <Button id="no-print" onClick={handleClick}>
        <FaDownload /> Download
      </Button>
      {selectedResume && <ResumeTemplate />}
    </Div>
  );
};

export default Download;
