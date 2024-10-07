// src/HRDetailsForm.js
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import '../Client/PostDetailsForm.css'; // Import your CSS for styling
import ClientHeader from './ClientHeader/ClientHeader';
import Footer from '../Home/Footer/footer';
import { Link } from 'react-router-dom';

const PostDetailsForm = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      interviewDates: [{ date: '', location: '' }],
      jobRoles: [''],
      workTypes: ['Full-time'], // Initialize with default work type options
    },
  });

  const { fields: interviewFields, append: appendInterview, remove: removeInterview } = useFieldArray({
    control,
    name: 'interviewDates',
  });

  const [jobRoles, setJobRoles] = useState(['']);
  const [certifications, setCertifications] = useState([]);
  const [workTypes, setWorkTypes] = useState(['Full-time', 'Part-time', 'Remote', 'Work from Home']);

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  const addJobRole = () => {
    setJobRoles([...jobRoles, '']);
  };

  const removeJobRole = (index) => {
    setJobRoles(jobRoles.filter((_, i) => i !== index));
  };

  const handleJobRoleChange = (index, value) => {
    const newJobRoles = [...jobRoles];
    newJobRoles[index] = value;
    setJobRoles(newJobRoles);
  };

  const addCertification = () => {
    setCertifications([...certifications, '']);
  };

  const handleCertificationChange = (index, value) => {
    const newCertifications = [...certifications];
    newCertifications[index] = value;
    setCertifications(newCertifications);
  };

  return (
    <body>
      <ClientHeader/>
    <div className="client-form">
      <h1>Post Hiring Details </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Job Roles</label>
          {/* <button type="button" className="add-more" onClick={addJobRole}>Add More</button> */}
          {jobRoles.map((role, index) => (
            <div key={index} className="job-role-field">
              <input
                type="text"
                placeholder="Job Role"
                 className="input-field"
                value={role}
                onChange={(e) => handleJobRoleChange(index, e.target.value)}
                {...register(`jobRoles.${index}`, { required: 'Job Role is required' })}
              />
              {jobRoles.length > 1 && (
                <button type="button" className="remove" onClick={() => removeJobRole(index)}>Remove</button>
              )}
            </div>
          ))}
          
          {errors.jobRoles && <p className="error">{errors.jobRoles.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="qualification">Qualification</label>
          <input
            id="qualification"
            type="text"
                 className="input-field"
            {...register('qualification', { required: 'Qualification is required' })}
          />
          {errors.qualification && <p className="error">{errors.qualification.message}</p>}
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="gender-group">
            <label>
              <input
                type="radio"
                value="male"
                {...register('gender', { required: 'Gender is required' })}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                {...register('gender', { required: 'Gender is required' })}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                value="other"
                {...register('gender', { required: 'Gender is required' })}
              />
              Other
            </label>
          </div>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="areaOfInterest">Area of Interest</label>
          <input
            id="areaOfInterest"
            type="text"
                 className="input-field"
            {...register('areaOfInterest', { required: 'Area of Interest is required' })}
          />
          {errors.areaOfInterest && <p className="error">{errors.areaOfInterest.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="specialization">Specialization</label>
          <input
            id="specialization"
            type="text"
                 className="input-field"
            {...register('specialization', { required: 'Specialization is required' })}
          />
          {errors.specialization && <p className="error">{errors.specialization.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="experience">Fresher/Experience</label>
          <input
            id="experience"
            type="text"
                 className="input-field"
            {...register('experience', { required: 'Experience status is required' })}
          />
          {errors.experience && <p className="error">{errors.experience.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="passedOut">Passed Out</label>
          <input
            id="passedOut"
            type="text"
                 className="input-field"
            {...register('passedOut', { required: 'Passed Out year is required' })}
          />
          {errors.passedOut && <p className="error">{errors.passedOut.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="ageNoRatio">Age</label>
          <input
            id="ageNoRatio"
            type="text"
                 className="input-field"
            {...register('ageNoRatio', { required: 'Age/No Ratio is required' })}
          />
          {errors.ageNoRatio && <p className="error">{errors.ageNoRatio.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
                 className="input-field"
            {...register('location', { required: 'Location is required' })}
          />
          {errors.location && <p className="error">{errors.location.message}</p>}
        </div>

        <div className="form-group">
          <label>Work Type</label>
          <div className="worktype-group">
            {workTypes.map((type, index) => (
              <label key={index}>
                <input
                  type="radio"
                  value={type}
                  {...register('workType', { required: 'Work Type is required' })}
                />
                {type}
              </label>
            ))}
          </div>
          {/* <button type="button" className="add-work-type" onClick={() => setWorkTypes([...workTypes, 'New Work Type'])}>Add More Work Type</button> */}
          {errors.workType && <p className="error">{errors.workType.message}</p>}
        </div>

        <div className="form-group">
          <label>Interview Dates</label>
          {interviewFields.map((field, index) => (
            <div key={field.id} className="interview-field">
              <input
                type="date"
                 className="input-field"
                placeholder="Interview Date"
                {...register(`interviewDates.${index}.date`)}
              />
              <input
                type="text"
                 className="input-field"
                placeholder="Interview Location"
                {...register(`interviewDates.${index}.location`)}
              />
              {/* <button type="button" className="remove" onClick={() => removeInterview(index)}>Remove</button> */}
            </div>
          ))}
          {/* <button type="button" className="add-interview" onClick={() => appendInterview({ date: '', location: '' })}>Add Interview Date</button> */}
        </div>

        <div className="form-group">
          <label htmlFor="noOfVacancy">Number of Vacancies</label>
          <input
            id="noOfVacancy"
            type="number"
                 className="input-field"
            {...register('noOfVacancy', { required: 'Number of Vacancies is required' })}
          />
          {errors.noOfVacancy && <p className="error">{errors.noOfVacancy.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="salaryDetails">Salary Details</label>
          <input
            id="salaryDetails"
            type="text"
                 className="input-field"
            {...register('salaryDetails', { required: 'Salary Details are required' })}
          />
          {errors.salaryDetails && <p className="error">{errors.salaryDetails.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="noOfVacancyRequired">Number of Vacancies Required</label>
          <input
            id="noOfVacancyRequired"
            type="number"
                 className="input-field"
            {...register('noOfVacancyRequired', { required: 'Number of Vacancies Required is required' })}
          />
          {errors.noOfVacancyRequired && <p className="error">{errors.noOfVacancyRequired.message}</p>}
        </div>

        {/* <div className="form-group">
          <label>Certifications</label>
          {certifications.map((cert, index) => (
            <div key={index} className="certification-field">
              <input
                type="text"
                 className="input-field"
                placeholder="Certification"
                value={cert}
                onChange={(e) => handleCertificationChange(index, e.target.value)}
              />
              {certifications.length > 1 && (
                <button type="button" className="remove" onClick={() => setCertifications(certifications.filter((_, i) => i !== index))}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" className="add-certification" onClick={addCertification}>Add More Certification</button>
        </div> */}

        <div className="submit-div">
          <Link to="/client_dashboard">
      <button type="submit" className="pd-submit-button">Submit</button></Link>&nbsp;&nbsp;&nbsp;
        <button type="submit" className="cancel-button">Cancel</button>
      </div>
      </form>
    </div>
    <Footer/>
    </body>
  );
};

export default PostDetailsForm;
