const experiencePrompt = (companyName, timeWorked, workDone) => {
  return `
  Task:(only generate the tags content as structured below and not even one line extra before or after the content i have strutured, no heading required)
  <h4>${companyName}</h4>
  <h4>${timeWorked}</h4>
  <h4>${workDone}</h4>
  and also do the following
  <h3>make sentence out of the following h4 tags .</h3>`;
};

export default experiencePrompt;
