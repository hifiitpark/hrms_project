import React, { useState } from 'react';
import './CandidateRegistrationForm.css';
import { Link } from 'react-router-dom';
import Footer from '../../Home/Footer/footer';
import Header from '../../Home/Header/header';

function CandidateRegistrationForm() {
  const technicalSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'];
  const nonTechnicalSkills = ['Communication', 'Problem-solving', 'Teamwork', 'Time Management', 'Leadership'];
  const [educationDetails, setEducationDetails] = useState([{ schoolName: '', board: '', qualification: '', specialization: '', startYear: '', endYear: '', cgpa: '' }]);
  // const [experienceDetails, setExperienceDetails] = useState([{ companyName: '', domain: '', jobRole: '', yearOfExperience: '', salaryPerAnnum: '' }]);
  const [certifications, setCertifications] = useState([{ certificateName: '', issuedOrganization: '', issueOfDate: '', certificationValidity: '' }]);

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducationDetails = [...educationDetails];
    newEducationDetails[index][name] = value;
    setEducationDetails(newEducationDetails);
  };

  const addEducationField = () => {
    setEducationDetails([...educationDetails, { schoolName: '', board: '', qualification: '', specialization: '', startYear: '', endYear: '', cgpa: '' }]);
  };

  const removeEducationField = (index) => {
    const newEducationDetails = [...educationDetails];
    newEducationDetails.splice(index, 1);
    setEducationDetails(newEducationDetails);
  };

  // const handleExperienceChange = (index, e) => {
  //   const { name, value } = e.target;
  //   const newExperienceDetails = [...experienceDetails];
  //   newExperienceDetails[index][name] = value;
  //   setExperienceDetails(newExperienceDetails);
  // };

  // const addExperienceField = () => {
  //   setExperienceDetails([...experienceDetails, { companyName: '', domain: '', jobRole: '', yearOfExperience: '', salaryPerAnnum: '' }]);
  // };

  // const removeExperienceField = (index) => {
  //   const newExperienceDetails = [...experienceDetails];
  //   newExperienceDetails.splice(index, 1);
  //   setExperienceDetails(newExperienceDetails);
  // };

  const handleCertificationChange = (index, e) => {
    const { name, value } = e.target;
    const newCertifications = [...certifications];
    newCertifications[index][name] = value;
    setCertifications(newCertifications);
  };

  const addCertificationField = () => {
    setCertifications([...certifications, { certificateName: '', issuedOrganization: '', issueOfDate: '', certificationValidity: '' }]);
  };

  const removeCertificationField = (index) => {
    const newCertifications = [...certifications];
    newCertifications.splice(index, 1);
    setCertifications(newCertifications);
  };

    const [isToggled, setIsToggled] = useState(false);
  
    const handleChange = () => {
      setIsToggled(!isToggled);
    };

      // State to track which skill is selected
  const [selectedSkill, setSelectedSkill] = useState('Technical');

  // Function to handle skill selection
  const handleSkillChange = (type) => {
    setSelectedSkill(type);
  };
    
  const [selectedexpType, setSelectedexpType] = useState('Experienced'); // Default to 'Experienced'
  const [experienceDetails, setExperienceDetails] = useState([
    { companyName: '', domain: '', jobRole: '', yearOfExperience: '', salaryPerAnnum: '' }
  ]);

  const handleexpChange = (expType) => {
    setSelectedexpType(expType);
  };

  const handleExperienceChange = (index, event) => {
    const newExperienceDetails = [...experienceDetails];
    newExperienceDetails[index][event.target.name] = event.target.value;
    setExperienceDetails(newExperienceDetails);
  };

  const addExperienceField = () => {
    setExperienceDetails([
      ...experienceDetails,
      { companyName: '', domain: '', jobRole: '', yearOfExperience: '', salaryPerAnnum: '' }
    ]);
  };

  const removeExperienceField = (index) => {
    const newExperienceDetails = experienceDetails.filter((_, i) => i !== index);
    setExperienceDetails(newExperienceDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and submission logic here
    console.log('Form Submitted', { educationDetails, experienceDetails, certifications });
  };

  

  return (
    <div>
      <Header/>
    <form onSubmit={handleSubmit} className="candidate-form">
      <div className="section about">
        <h2>About Me</h2>
        <label>Photo</label>
        <input type="file" name="photo" className="input-file" />

        <label>First Name</label>
        <input type="text" name="firstName" placeholder="First Name" className="input-field" />

        <label>Last Name</label>
        <input type="text" name="lastName" placeholder="Last Name" className="input-field" />

        <label>D.O.B</label>
        <input type="date" name="dob" className="input-field" />

        <label>Gender</label>
        <div className="gender-group">
          <label><input type="radio" name="gender" value="Male" /> Male</label>
          <label><input type="radio" name="gender" value="Female" /> Female</label>
          <label><input type="radio" name="gender" value="Others" /> Others</label>
        </div>

        <label>Email</label>
        <input type="email" name="email" placeholder="Email" className="input-field" />

        <label>Phone Number</label>
        <input type="tel" name="phoneNumber" placeholder="Phone Number" className="input-field" />

        <label>Current Position</label>
        <input type="text" name="currentPosition" placeholder="Current Position" className="input-field" />

        <label>Current Position at</label>
        <input type="text" name="currentPositionAt" placeholder="Current Position at" className="input-field" />

        <label>Marital Status</label>
        <div className="marital-group">
          <label><input type="radio" name="maritalStatus" value="Single" />  Single</label>
          <label><input type="radio" name="maritalStatus" value="Married" /> Married</label>
          <label><input type="radio" name="maritalStatus" value="Others" />  Others</label>
        </div>


        <label>Address</label>
        <input type="text" name="address" placeholder="Enter your address" className="input-field" />

        <label>City</label>
        <input type="text" name="city" placeholder="City" className="input-field" />

        <label>Pincode</label>
        <input type="text" name="pincode" placeholder="Pincode" className="input-field" />

        <label>State</label>
        <input type="text" name="state" placeholder="State" className="input-field" />

        <label>Country</label>
        <input type="text" name="country" placeholder="Country" className="input-field" />
      </div>

      <div className="section">
        <h2>Education Details</h2>
        {educationDetails.map((education, index) => (
          <div key={index} className="education-group">
            <label>School/College Name</label>
            <input type="text" name="schoolName" placeholder="School Name" className="input-field" value={education.schoolName} onChange={(e) => handleEducationChange(index, e)} />
            
            <label>Board</label>
            <input type="text" name="board" placeholder="Board" className="input-field" value={education.board} onChange={(e) => handleEducationChange(index, e)} />
            
            <label>Qualification</label>
            <input type="text" name="qualification" placeholder="Qualification" className="input-field" value={education.qualification} onChange={(e) => handleEducationChange(index, e)} />
            
            <label>Specialization</label>
            <input type="text" name="specialization" placeholder="Specialization" className="input-field" value={education.specialization} onChange={(e) => handleEducationChange(index, e)} />
            
            <label>Start Year</label>
            <input type="date" name="startYear" className="input-field" value={education.startYear} onChange={(e) => handleEducationChange(index, e)} />
            
            <label>End Year</label>
            <input type="date" name="endYear" className="input-field" value={education.endYear} onChange={(e) => handleEducationChange(index, e)} />
            
            <label>Percentage</label>
            <input type="number" name="Percentage" placeholder="Percentage" className="input-field" value={education.cgpa} onChange={(e) => handleEducationChange(index, e)} />
            
            <label>CGPA</label>
            <input type="number" name="cgpa" placeholder="CGPA" className="input-field" value={education.cgpa} onChange={(e) => handleEducationChange(index, e)} />

            <div className="button-group">
              <button type="button" className="add-more" onClick={addEducationField}>+ Add More</button>
              {educationDetails.length > 1 && (
                <button type="button" className="remove" onClick={() => removeEducationField(index)}>- Remove</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="section">
      <h2>Experience Details</h2>

      <div style={{ display: 'flex', marginBottom: '15px' }}>
        <button
          className={`exp-button ${selectedexpType === 'Fresher' ? 'active' : ''}`}
          onClick={() => handleexpChange('Fresher')}
        >
          Fresher
        </button>
        <button
          className={`exp-button ${selectedexpType === 'Experienced' ? 'active' : ''}`}
          onClick={() => handleexpChange('Experienced')}
        >
          Experienced
        </button>
      </div>

      {experienceDetails.map((experience, index) => (
        <div key={index} className="experience-group">
          {selectedexpType === 'Experienced' && (
            <>
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                className="input-field"
                value={experience.companyName}
                onChange={(e) => handleExperienceChange(index, e)}
              />

              <label>Domain</label>
              <input
                type="text"
                name="domain"
                placeholder="Domain"
                className="input-field"
                value={experience.domain}
                onChange={(e) => handleExperienceChange(index, e)}
              />

              <label>Job Role</label>
              <input
                type="text"
                name="jobRole"
                placeholder="Job Role"
                className="input-field"
                value={experience.jobRole}
                onChange={(e) => handleExperienceChange(index, e)}
              />

              <label>Year of Experience</label>
              <input
                type="text"
                name="yearOfExperience"
                placeholder="Year of Experience"
                className="input-field"
                value={experience.yearOfExperience}
                onChange={(e) => handleExperienceChange(index, e)}
              />

              <label>Salary per Annum</label>
              <input
                type="number"
                name="salaryPerAnnum"
                placeholder="Salary per Annum"
                className="input-field"
                value={experience.salaryPerAnnum}
                onChange={(e) => handleExperienceChange(index, e)}
              />
            </>
          )}

          <div className="button-group">
            {selectedexpType === 'Experienced' && (
              <button type="button" className="add-more" onClick={addExperienceField}>
                + Add More
              </button>
            )}
            {experienceDetails.length > 1 && (
              <button type="button" className="remove" onClick={() => removeExperienceField(index)}>
                - Remove
              </button>
            )}
          </div>
        </div>
      ))}
    </div>

      <div className="section">
        <h2>Courses</h2>
        {certifications.map((certification, index) => (
          <div key={index} className="certification-group">
            <label>Course Name</label>
            <input type="text" name="courseName" placeholder="Certificate Name" className="input-field" value={certification.certificateName} onChange={(e) => handleCertificationChange(index, e)} />
            
            <label>Institute Name</label>
            <input type="text" name="instiuteName" placeholder="Institute Name" className="input-field" value={certification.issuedOrganization} onChange={(e) => handleCertificationChange(index, e)} />
            
            <label>Course Duration</label>
            <div className='coursestart'>
            <lable><b>start</b></lable>
            <input type="date" name="coursestartDate" className="input-field" value={certification.issueOfDate} onChange={(e) => handleCertificationChange(index, e)} />
            <lable><b>end</b></lable>
            <input type="date" name="courseendDate" className="input-field" value={certification.issueOfDate} onChange={(e) => handleCertificationChange(index, e)} />
            </div>
            {/* <label>Validity Date</label>
            <input type="date" name="ValidityDate" className="input-field" value={certification.certificationValidity} onChange={(e) => handleCertificationChange(index, e)} /> */}
            <label>License</label>
            <input type="text" name="License" placeholder="License" className="input-field" value={certification.certificationValidity} onChange={(e) => handleCertificationChange(index, e)} />

            <div className="button-group">
              <button type="button" className="add-more" onClick={addCertificationField}>+ Add More</button>
              {certifications.length > 1 && (
                <button type="button" className="remove" onClick={() => removeCertificationField(index)}>- Remove</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Certifications</h2>
        {certifications.map((certification, index) => (
          <div key={index} className="certification-group">
            <label>Certificate Name</label>
            <input type="text" name="certificateName" placeholder="Certificate Name" className="input-field" value={certification.certificateName} onChange={(e) => handleCertificationChange(index, e)} />
            
            <label>Issued Organization</label>
            <input type="text" name="issuedOrganization" placeholder="Issued Organization" className="input-field" value={certification.issuedOrganization} onChange={(e) => handleCertificationChange(index, e)} />
            
            <label> Date of Issue </label>
            <input type="date" name="issueOfDate" className="input-field" value={certification.issueOfDate} onChange={(e) => handleCertificationChange(index, e)} />
            
            {/* <label>Certification Validity</label>
            <input type="date" name="certificationValidity" className="input-field" value={certification.certificationValidity} onChange={(e) => handleCertificationChange(index, e)} /> */}


            <label>Certification Input</label>
            <input type="file" name="certification_input" className="input-file" />
              
            <div className="button-group">
              <button type="button" className="add-more" onClick={addCertificationField}>+ Add More</button>
              {certifications.length > 1 && (
                <button type="button" className="remove" onClick={() => removeCertificationField(index)}>- Remove</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="section">
      <h2>Skills</h2>
      {certifications.map((certification, index) => (
        <div key={index} className="certification-group">
          <label>Skill</label>
          <div style={{ display: 'flex', marginBottom: '15px' }}>
            {/* Button for Technical */}
            <button
              className={`skill-button ${selectedSkill === 'Technical' ? 'active' : ''}`}
              onClick={() => handleSkillChange('Technical')}
            >
              Technical
            </button>

            {/* Button for Non-Technical */}
            <button
              className={`skill-button ${selectedSkill === 'Non-Technical' ? 'active' : ''}`}
              onClick={() => handleSkillChange('Non-Technical')}
            >
              Non-Technical
            </button>
          </div>

          {/* Conditional Dropdown */}
          {selectedSkill === 'Technical' && (
            <select className='skillset'>
              <option value="">Select Technical Skill</option>
              {technicalSkills.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          )}
          {selectedSkill === 'Non-Technical' && (
            <select className='skillset'>
              <option value="">Select Non-Technical Skill</option>
              {nonTechnicalSkills.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          )}
        
      
            
            <label>Area of Interest</label>
            <input type="text" name="areofInterest" placeholder="Area of Interest" className="input-field" value={certification.issuedOrganization} onChange={(e) => handleCertificationChange(index, e)} />
            
            <label>Expected CTC</label>
            <input type="number" name="expectedCTC" placeholder="Expected CTC" className="input-field" value={certification.issuedOrganization} onChange={(e) => handleCertificationChange(index, e)} />
            

              </div>
        ))}
      </div>   

<div className='section'>
<label>Resume CV</label>
            <input type="file" name="resume" className="input-file" />

            <label>Signature</label>
            <input type="file" name="signature" className="input-file" />
</div>

      <div className="form-group">
          <label className='declaration_lbl'>
            <input type="checkbox" className="declaration" /> I hereby declare that the information given above and in the enclosed
            documents is true to the best of my knowledge and belief and nothing has been concealed therein.
          </label>
      </div>

      <div className="candidate-submit-div">
     <Link to="/candidate_welcome"> <button type="submit" className="candidate-submit-button">Submit</button></Link>
        <button type="submit" className="cancel-button">Cancel</button>
      </div>
    </form>
    <Footer/>
    </div>
  );
}
export default CandidateRegistrationForm;
