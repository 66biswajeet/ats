// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useUser } from "@clerk/clerk-react";
// import { chatSession } from "../../../../gen-ai/Gemini";
// import experiencePrompt from "../../../../prompts/experience_prompt";
// import DOMPurify from "dompurify";
// import { useParams } from "react-router-dom";

// const InputContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 20px;
// `;

// const Label = styled.label`
//   font-size: 14px;
//   margin-bottom: 5px;
//   color: var(--third-color);
// `;

// const StyledInput = styled.input`
//   padding: 10px;
//   border: 1px solid var(--fourth-color);
//   border-radius: 4px;
//   font-size: 16px;
//   color: var(--third-color);
//   background-color: var(--fifth-color);
//   transition: border-color 0.3s ease;
//   height: 30px;

//   &:focus {
//     outline: none;
//     border-color: var(--primary-color);
//   }
// `;

// const Button = styled.button`
//   background-color: var(--primary-color);
//   color: var(--fifth-color);
//   padding: 10px 20px;
//   border: none;
//   border-radius: 4px;
//   font-size: 16px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   margin: 10px 20px;

//   &:hover {
//     background-color: var(--secondary-color);
//   }
// `;

// const ExperienceInput = () => {
//   const [companyName, setCompanyName] = useState("");
//   const [timeWorked, setTimeWorked] = useState("");
//   const [workDone, setWorkDone] = useState("");
//   const [position, setPosition] = useState("");
//   const [fresponse, setFresponse] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resumes, setResumes] = useState("");
//   const [selectedResume, setSelectedResume] = useState();

//   const { user } = useUser();
//   const { resumeId } = useParams();

//   const generateResponse = async () => {
//     setLoading(true);
//     try {
//       const experienceResponse = await chatSession.sendMessage(
//         experiencePrompt(companyName, timeWorked, position, workDone)
//       );
//       setFresponse(DOMPurify.sanitize(experienceResponse.response.text()));
//       console.log(fresponse);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//     }
//     setLoading(false);
//   };

//   // const fetchResumes = async () => {
//   //   if (!user) return;

//   //   try {
//   //     const response = await fetch(
//   //       `http://localhost:5000/api/new-resume/${user.id}`
//   //     );

//   //     if (!response.ok) {
//   //       throw new Error("Failed to fetch resumes");
//   //     }

//   //     const data = await response.json();
//   //     setResumes(data); // Update the state with the fetched resumes
//   //   } catch (error) {
//   //     console.error("Error fetching resumes:", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchResumes(); // Fetch resumes when the component mounts
//   // }, [user]);

//   const handleSaveExperience = async () => {
//     const resumeData = {
//       resumeId: resumeId,
//       experience: fresponse,
//       // response:
//     };

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/new-resume/${user.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ resumeData }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to save experience");
//       }

//       // Optionally, you can navigate to a different page or update the UI
//       // after successfully saving the experience
//     } catch (error) {
//       console.error("Error saving experience:", error);
//     }
//   };

//   // useEffect(() => {
//   //   if (resumes.length > 0) {
//   //     const resume = resumes.find((r) => r.resumeId === resumeId);

//   //     setSelectedResume(resume);
//   //   }
//   // }, [resumes, resumeId]);

//   return (
//     <InputContainer>
//       <Label htmlFor="companyName">Company Name:</Label>
//       <StyledInput
//         id="companyName"
//         placeholder="Enter the company name"
//         value={companyName}
//         onChange={(e) => setCompanyName(e.target.value)}
//       />
//       <Label htmlFor="timeWorked">Time Worked:</Label>
//       <StyledInput
//         id="timeWorked"
//         placeholder="Enter the time worked"
//         value={timeWorked}
//         onChange={(e) => setTimeWorked(e.target.value)}
//       />
//       <Label htmlFor="timeWorked">Position : </Label>
//       <StyledInput
//         id="positon"
//         placeholder="Enter your position"
//         value={position}
//         onChange={(e) => setPosition(e.target.value)}
//       />
//       <Label htmlFor="workDone">Work Done:</Label>
//       <StyledInput
//         id="workDone"
//         placeholder="Enter the work done"
//         value={workDone}
//         onChange={(e) => setWorkDone(e.target.value)}
//       />
//       <Button onClick={generateResponse}>Generate with AI</Button>
//       <Button onClick={handleSaveExperience}>Save</Button>
//       {/* {fresponse && (
//         <div className="border p-4 rounded">
//           <p dangerouslySetInnerHTML={{ __html: fresponse }}></p>
//         </div>
//       )} */}

//       {fresponse && (
//         <div className="border p-4 rounded">
//           <textarea
//             value={fresponse}
//             onChange={(e) => setFresponse(e.target.value)} // Update `fresponse` as user edits
//             className="w-full p-2 border rounded" // Add any additional styling as needed
//             rows={4} // Adjust rows for the height you need
//           />
//         </div>
//       )}
//     </InputContainer>
//   );
// };

// export default ExperienceInput;

//////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUser } from "@clerk/clerk-react";
// import { chatSession } from "../../../../gen-ai/Gemini";
import { connectOpenAIAPI } from "../../../../gen-ai/Gemini";
import experiencePrompt from "../../../../prompts/experience_prompt";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: var(--third-color);
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid var(--fourth-color);
  border-radius: 4px;
  font-size: 16px;
  color: var(--third-color);
  background-color: var(--fifth-color);
  transition: border-color 0.3s ease;
  height: 30px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: var(--fifth-color);
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px 20px;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const StyledInputText = styled.textarea`
  padding: 10px;
  border: 1px solid var(--fourth-color);
  border-radius: 4px;
  font-size: 16px;
  color: var(--third-color);
  background-color: var(--fifth-color);
  transition: border-color 0.3s ease;
  height: 150px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExperienceInput = () => {
  const [experiences, setExperiences] = useState([
    {
      companyName: "",
      timeWorked: "",
      workDone: "",
      fresponse: "",
      heading: "Professional Experience",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { resumeId } = useParams();
  const [exp, setExp] = useState();

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(); // State for the filtered resume

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperiences(updatedExperiences);
  };

  const generateResponse = async (index) => {
    setLoading(true);
    try {
      const experience = experiences[index];
      // const experienceResponse = await chatSession.sendMessage(
      //   experiencePrompt(experience.workDone)
      // );
      const experienceResponse = await connectOpenAIAPI(
        experiencePrompt(experience.workDone)
      );
      const sanitizedResponse = DOMPurify.sanitize(
        experienceResponse.response.text()
      );

      const updatedExperiences = experiences.map((exp, i) =>
        i === index ? { ...exp, fresponse: sanitizedResponse } : exp
      );
      setExperiences(updatedExperiences);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
    setLoading(false);
  };

  const handleSaveExperience = async () => {
    const resumeData = {
      resumeId: resumeId,
      experiences: experiences,
      experiencesHeading: "Professional Experience",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/new-resume/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resumeData }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save experiences");
      }
    } catch (error) {
      console.error("Error saving experiences:", error);
    }
  };

  const addNewExperience = () => {
    setExperiences([
      ...experiences,
      { companyName: "", timeWorked: "", workDone: "", fresponse: "" },
    ]);
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
      setResumes(data); // Update the state with the fetched resumes
      const selectedResume = data.find(
        (resume) => resume.resumeId === resumeId
      );
      setExperiences(selectedResume?.experiences || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchResumes(); // Fetch resumes when the component mounts
  }, [user]);

  return (
    <InputContainer>
      {experiences.map((experience, index) => (
        <Div key={index} style={{ marginBottom: "20px" }}>
          <Label htmlFor={`companyName-${index}`}>Company Name:</Label>
          <StyledInput
            id={`companyName-${index}`}
            placeholder="Enter the company name"
            value={experience.companyName}
            onChange={(e) =>
              handleExperienceChange(index, "companyName", e.target.value)
            }
          />
          <Label htmlFor={`timeWorked-${index}`}>Time Worked:</Label>
          <StyledInput
            id={`timeWorked-${index}`}
            placeholder="Enter the time worked"
            value={experience.timeWorked}
            onChange={(e) =>
              handleExperienceChange(index, "timeWorked", e.target.value)
            }
          />
          <Label htmlFor={`workDone-${index}`}>Work Done:</Label>
          <StyledInput
            id={`workDone-${index}`}
            placeholder="Enter the work done"
            value={experience.workDone}
            onChange={(e) =>
              handleExperienceChange(index, "workDone", e.target.value)
            }
          />
          <Button onClick={() => generateResponse(index)}>
            Generate with AI
          </Button>

          <StyledInputText
            id={`fresponse-${index}`}
            placeholder="Your experience para will shown here..."
            value={experience.fresponse}
            onChange={(e) =>
              handleExperienceChange(index, "fresponse", e.target.value)
            }
          />
        </Div>
      ))}
      <Button onClick={addNewExperience}>Add New Experience</Button>
      <Button onClick={handleSaveExperience}>Save All Experiences</Button>
    </InputContainer>
  );
};

export default ExperienceInput;
