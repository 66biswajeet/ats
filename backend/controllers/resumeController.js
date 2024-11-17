const { db } = require("../config/firebaseConfig");
const { v4: uuidv4 } = require("uuid"); // To generate unique resume IDs

// Controller to add a resume for a specific user
/////////////////////////////////  add resume 1 ///////////////////////////////////
// const addResume = async (req, res) => {
//   const { userId } = req.params; // Extract userId from URL params
//   const { resumeName, resumeId } = req.body;

//   try {
//     // Generate a unique resumeId using uuid
//     // const resumeId = uuidv4();

//     // Add the resume data to Firestore
//     await db.collection(`users/${userId}/resumes`).add({
//       userId,
//       resumeId,
//       resumeName,
//       createdAt: new Date().toISOString(),
//     });

//     return res.status(200).json({ message: "Resume added successfully" });
//   } catch (error) {
//     console.error("Error adding resume:", error);
//     return res.status(500).json({ error: "Failed to add resume" });
//   }
// };

/////////////////////////////////  add resume 2 ///////////////////////////////////

const addResume = async (req, res) => {
  const { userId } = req.params; // Extract userId from URL params
  const {
    resumeId,
    resumeName,

    candidateName,
    candidateEmail,
    candidateAddress,
    candidateNumber,
    summary,
    summaryHeading,
    experience,
    education,
    skills,
    skillHeading,
    achievements,
    achievementHeading,
  } = req.body;

  try {
    // Generate a unique resumeId using uuid
    //const resumeId = uuidv4();

    // Add the resume data to Firestore
    await db.collection(`users/${userId}/resumes`).add({
      userId,
      resumeId,
      resumeName,
      candidateName,
      candidateEmail,
      candidateAddress,
      candidateNumber,
      summaryHeading,
      summary, // Store the summary
      experience, // Store experience array
      education, // Store education object
      skills, // Store skills array
      skillHeading,
      achievements,
      achievementHeading,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({ message: "Resume added successfully" });
  } catch (error) {
    console.error("Error adding resume:", error);
    return res.status(500).json({ error: "Failed to add resume" });
  }
};

// Controller to get all resumes for a specific user
const getResumeDetails = async (req, res) => {
  const { userId } = req.params; // Extract userId from URL params

  try {
    // Query Firestore to get resumes that match the provided userId
    const resumeCollection = await db
      .collection(`users/${userId}/resumes`)
      .where("userId", "==", userId)
      .get();

    // If no resumes found for the user
    if (resumeCollection.empty) {
      return res
        .status(404)
        .json({ message: "No resumes found for this user" });
    }

    // Map through the collection and get all documents
    const resumes = resumeCollection.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document data
    }));

    res.status(200).json(resumes); // Send the data back as a JSON response
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).send("Error fetching resumes.");
  }
};

// Controller to delete a specific resume by resumeId (provided in the body)
const deleteResume = async (req, res) => {
  const { userId } = req.params; // Extract userId from URL params
  const { resumeId } = req.body; // Get resumeId from the request body

  try {
    // Query Firestore to find the specific resume by userId and resumeId
    const resumeSnapshot = await db
      .collection(`users/${userId}/resumes`)
      .where("userId", "==", userId)
      .where("resumeId", "==", resumeId)
      .get();

    // If the resume is not found
    if (resumeSnapshot.empty) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Delete the document(s) matched by the query
    resumeSnapshot.forEach(async (doc) => {
      await doc.ref.delete();
    });

    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    return res.status(500).json({ error: "Failed to delete resume" });
  }
};

const updateResume = async (req, res) => {
  const { userId } = req.params;
  const { resumeData } = req.body; // Extract resumeData from the request body
  const {
    resumeId,
    candidateName,
    candidateEmail,
    candidateAddress,
    candidateNumber,
    summary,
    summaryHeading,
    experiencesHeading,
    experiences,
    education,
    educationHeading,
    skills,
    skillHeading,
    achievements,
    achievementHeading,
    projects,
    projectsHeading,
  } = resumeData; // Destructure resumeId and other fields

  console.log("Updating resume for userId:", userId, "resumeId:", resumeId);

  try {
    const resumeSnapshot = await db
      .collection(`users/${userId}/resumes`)
      .where("resumeId", "==", resumeId)
      .get();

    if (resumeSnapshot.empty) {
      console.error("Resume not found for resumeId:", resumeId);
      return res.status(404).json({ message: "Resume not found" });
    }

    resumeSnapshot.forEach(async (doc) => {
      await doc.ref.update({
        candidateName,
        candidateEmail,
        candidateAddress,
        candidateNumber,
        summary,
        summaryHeading,
        experiences,
        experiencesHeading,
        education,
        educationHeading,
        skills,
        skillHeading,
        achievements,
        achievementHeading,
        projects,
        projectsHeading,
        updatedAt: new Date().toISOString(),
      });
    });

    return res.status(200).json({ message: "Resume updated successfully" });
  } catch (error) {
    console.error("Error updating resume:", error);
    return res.status(500).json({ error: "Failed to update resume" });
  }
};

module.exports = { addResume, getResumeDetails, deleteResume, updateResume };
