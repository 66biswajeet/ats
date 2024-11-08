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
    summaryHeading = "Summary",
    experience = [],
    education = {},
    skills = []
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
    this.experience = experience;
    this.education = education;
    this.skills = skills;
  }
}

module.exports = Newresume;
