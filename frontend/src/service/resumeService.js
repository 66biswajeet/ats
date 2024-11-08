// src/services/resumeService.js

export const fetchResumes = async (userId) => {
  if (!userId) throw new Error("User ID is required");

  try {
    const response = await fetch(
      `http://localhost:5000/api/new-resume/${userId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch resumes");
    }

    const data = await response.json();
    return data; // Return the fetched resume data
  } catch (error) {
    console.error("Error fetching resumes:", error);
    throw error; // Propagate the error to the caller
  }
};
