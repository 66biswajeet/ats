// /backend/models/userModel.js

// class Newresume {
//   constructor(username, email, resumeId = "", resumeName = "") {
//     this.username = username;
//     this.email = email;
//     this.resumeId = resumeId;
//     this.resumeName = resumeName;
//   }
// }

// module.exports = Newresume;

// /backend/models/userModel.js

class Newresume {
  constructor(
    username,
    email,
    resumeId = "",
    resumeName = "",
    candidateName = "",
    candidateEmail = "",
    candidateAddress = "",
    candidateNumber = "",
    summary = "",
    summaryHeading = "",
    experiences = [],
    experiencesHeading = "",
    education = [],
    educationHeading = "",
    skills = [],
    skillHeading = "",
    achievements = [],
    achievementHeading = "",
    projects = [],
    projectsHeading = ""
  ) {
    this.username = username;
    this.email = email;
    this.resumeId = resumeId;
    this.resumeName = resumeName;
    this.candidateName = candidateName;
    this.candidateAddress = candidateAddress;
    this.candidateEmail = candidateEmail;
    this.candidateNumber = candidateNumber;
    this.summary = summary;
    this.summaryHeading = summaryHeading;
    this.experiencesHeading = experiencesHeading;
    this.experiences = experiences;
    this.education = education;
    this.educationHeading = educationHeading;
    this.skills = skills;
    this.skillHeading = skillHeading;
    this.achievements = achievements;
    this.achievementHeading = achievementHeading;
    this.projects = projects;
    this.projectsHeading = projectsHeading;
  }
}

module.exports = Newresume;
