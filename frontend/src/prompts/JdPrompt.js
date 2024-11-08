const JdPrompt = (jd, resume) => {
  //   return `You are a sophisticated ATS (applicant tracking system) scanner with deep expertise in various technical fields and advanced ATS functionality. Your task is to intelligently match the resume data (${resume}) against the provided job description data (${jd}) based on keywords matching , the technical keywords(skills , experience , tools ) or related keywords should on job desctiption must be present on the resume, focusing on relevance and specificity.If the technical skills or any thing present on the job description does not match with the given resume give specific match score (no extra marks).

  //  provide only the overall percentage match of the resume with the job description. This should be a single number without any additional text only number and nothing else.Not even the percentage sign .
  // `;

  return `Analyze resume (${resume})  against job descriptions (${jd}), considering keywords, skills, experience, education, and any additional specified criteria.
Implement stemming and lemmatization to account for variations in word forms.
Use a customizable skill inventory that can be tailored to specific industries or roles.
Assign appropriate weights to different skills based on their importance to the job.
Evaluate the relevance and duration of experience in relevant roles.
Assess educational qualifications against the required degree(s) and field(s) of study.
Incorporate customizable fields to include other relevant criteria as needed.
Strive for contextual understanding by exploring the use of natural language processing (NLP) techniques.
marks should reduce for wrong spellings and grammars .
Prioritize user-friendliness and data privacy in the ATS interface.

provide only the overall percentage match of the resume with the job description. This should be a single number without any additional text only number and nothing else.Not even the percentage sign .`;
};

export default JdPrompt;
