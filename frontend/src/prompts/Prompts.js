const Resume_extract_prompt = (resume) => {
  return `Task:(only generate the resume content as structured below and not even one line extra before or after the content i have strutured, no heading required): Extract all the candidate information from the resume (${resume}) (only generate the resume content as structured below and not even one line extra before or after the content i have strutured)  and generate a detailed analysis structured with  tags:

            
Note: sharp start from the name nothing extra .
<p class = "name">[Candidate Name]</p>



<h4>Contact Information</h4>
<ul>
  <li>[Phone Number]</li>
  <li>[Email Address]</li>
  <a >[other links]</a>
  <a >[Linkedin]</a> if available
  <a >[git hub]</a> if available
</ul>

<h4>Summary</h4>
<p>[Professional summary or objective statement]</p>

<h4>Skills</h4>
<ul>
  <li class = "skills">[Skill 1]</li>
  <li class = "skills">[Skill 2]</li>
  <!-- Add more skills as needed -->
</ul>

<h4>Experience</h4>
<h5>[Job Title] at [Company Name]</h5>
<p>[Employment Period]</p>
<ul>
  <li>[Responsibility/Achievement 1]</li>
  <li>[Responsibility/Achievement 2]</li>
  <!-- Add more items as needed -->
</ul>

<!-- Repeat the above structure for each job -->

<h4>Education</h4>
<h5>[Degree] in [Field of Study]</h5>
<p>[University Name], [Graduation Year]</p>

<h4>Projects</h4>
<h5>[Project Name]</h5>
<ul>
  <li>[Project Description]</li>
  <li>[Technologies Used]</li>
 
</ul>

<!-- Repeat the above structure for each project -->
Note : if some points is not specified then ignore it . 

`;
};

export default Resume_extract_prompt;
