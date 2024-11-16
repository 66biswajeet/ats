const experiencePrompt = (workDone) => {
  return `
  Task:(only generate as instructed and not even one line extra before or after the content i have structured, no heading required)
  
  
  
   rewrite the contribution (${workDone}) in 30 words paragraph .
  
  `;
};

export default experiencePrompt;

// <div style="display:flex; flex-direction:row; justify-content : space-between ">
//   <h4>Company Name: ${companyName}</h4>
//   <h4 style="margin-left: 10px;"> ${timeWorked}</h4>
// </div>
// <h4 style="margin-top:-10px">Position : ${position}</h4>
