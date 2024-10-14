import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios'; // Import axios for API calls
import '../Client/PostDetailsForm.css'; // Import your CSS for styling
import ClientHeader from './ClientHeader/ClientHeader';
import Footer from '../Home/Footer/footer';

const PostDetailsForm = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      interview_dates: [{ date: '', location: '' }], // Initialized with empty fields
      job_roles: [''],
      certifications: [''],
      work_type: '', // Initialize work type as empty string
      no_of_vacancies: null, // Change default value to null
      salary_details: '', // Initialize salary details
      no_of_vacancy_required: '', // Initialize number of vacancies required
    },
  });

  const { fields: interviewFields, append: appendInterview, remove: removeInterview } = useFieldArray({
    control,
    name: 'interview_dates', // Match Django model
  });

  const { fields: jobRoleFields, append: appendJobRole, remove: removeJobRole } = useFieldArray({
    control,
    name: 'job_roles', // Ensure this matches your Django model
  });

  const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({
    control,
    name: 'certifications',
  });

  const onSubmit = async (data) => {
    // Handle number of vacancies
    if (data.no_of_vacancies === '') {
      data.no_of_vacancies = null;
    } else {
      data.no_of_vacancies = parseInt(data.no_of_vacancies, 10);
    }
  
    // Take the first job role if it exists
    if (data.job_roles && data.job_roles.length > 0) {
      data.job_roles = data.job_roles[0]; // Save the first job role as a string
    } else {
      data.job_roles = ""; // Handle empty case
    }

    // Prepare interview details for submission
    const interviewDetails = data.interview_dates.map(({ date, location }) => ({
      date,
      location,
    }));

    // Create the payload to send to the server
    const payload = {
      ...data,
      interview_details: interviewDetails // Add interview details here
    };

    console.log('Form data submitted:', payload);
  
    try {
      const response = await axios.post('http://localhost:8000/api/hiring-details/', payload);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('There was an error posting the data!', error);
      console.log('Error response:', error.response.data);
    }
  };
  

  return (
    <div>
      <ClientHeader />
      <div className="client-form">
        <h1>Post Hiring Details</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Job Roles Section */}
          <div className="form-group">
            <label>Job Roles</label>
            <button type="button" className="add-more" onClick={() => appendJobRole('')}>Add More</button>
            {jobRoleFields.map((field, index) => (
              <div key={field.id} className="job-role-field">
                <input
                  type="text"
                  placeholder="Job Role"
                  className="input-field"
                  {...register(`job_roles.${index}`, { required: 'Job Role is required' })}
                />
                {jobRoleFields.length > 1 && (
                  <button type="button" className="remove" onClick={() => removeJobRole(index)}>Remove</button>
                )}
              </div>
            ))}
            {errors.job_roles && <p className="error">{errors.job_roles.message}</p>}
          </div>

          {/* Certifications Section */}
          <div className="form-group">
            <label>Certifications</label>
            <button type="button" className="add-more" onClick={() => appendCertification('')}>Add More Certification</button>
            {certificationFields.map((field, index) => (
              <div key={field.id} className="certification-field">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Certification"
                  {...register(`certifications.${index}`, { required: 'Certification is required' })}
                />
                {certificationFields.length > 1 && (
                  <button type="button" className="remove" onClick={() => removeCertification(index)}>Remove</button>
                )}
              </div>
            ))}
            {errors.certifications && <p className="error">{errors.certifications.message}</p>}
          </div>

          {/* Other Fields */}
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
              {...register('area_of_interest', { required: 'Area of Interest is required' })}
            />
            {errors.area_of_interest && <p className="error">{errors.area_of_interest.message}</p>}
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
              {...register('passed_out', { required: 'Passed Out year is required' })}
            />
            {errors.passed_out && <p className="error">{errors.passed_out.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="ageNoRatio">Age/No Ratio</label>
            <input
              id="ageNoRatio"
              type="text"
              className="input-field"
              {...register('age_no_ratio', { required: 'Age or No Ratio is required' })}
            />
            {errors.age_no_ratio && <p className="error">{errors.age_no_ratio.message}</p>}
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
            <label htmlFor="workType">Work Type</label>
            <input
              id="workType"
              type="text"
              className="input-field"
              {...register('work_type', { required: 'Work Type is required' })}
            />
            {errors.work_type && <p className="error">{errors.work_type.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="noOfVacancies">Number of Vacancies</label>
            <input
              id="noOfVacancies"
              type="number"
              className="input-field"
              {...register('no_of_vacancies')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="salaryDetails">Salary Details</label>
            <input
              id="salaryDetails"
              type="text"
              className="input-field"
              {...register('salary_details', { required: 'Salary Details are required' })}
            />
            {errors.salary_details && <p className="error">{errors.salary_details.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="noOfVacancyRequired">Number of Vacancy Required</label>
            <input
              id="noOfVacancyRequired"
              type="number"
              className="input-field"
              {...register('no_of_vacancy_required', { required: 'Number of Vacancy Required is required' })}
            />
            {errors.no_of_vacancy_required && <p className="error">{errors.no_of_vacancy_required.message}</p>}
          </div>

          {/* Interview Details Section */}
          <div className="form-group">
            <label>Interview Details</label>
            <button type="button" className="add-more" onClick={() => appendInterview({ date: '', location: '' })}>Add Interview</button>
            {interviewFields.map((field, index) => (
              <div key={field.id} className="interview-field">
                <input
                  type="date"
                  className="input-field"
                  placeholder="Date"
                  {...register(`interview_dates.${index}.date`, { required: 'Date is required' })}
                />
                <input
                  type="text"
                  className="input-field"
                  placeholder="Location"
                  {...register(`interview_dates.${index}.location`, { required: 'Location is required' })}
                />
                {interviewFields.length > 1 && (
                  <button type="button" className="remove" onClick={() => removeInterview(index)}>Remove</button>
                )}
              </div>
            ))}
            {errors.interview_dates && <p className="error">{errors.interview_dates.message}</p>}
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetailsForm;
