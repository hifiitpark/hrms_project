import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios'; // Import axios for API calls
import '../Client/PostDetailsForm.css'; // Import your CSS for styling
import ClientHeader from './ClientHeader/ClientHeader';
import Footer from '../Home/Footer/footer';

const PostDetailsForm = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      interview_dates: [{ interview_date: '', interview_location: '' }],
      job_roles: [''],
      certifications: [''],
      work_type: '',
      no_of_vacancies: null,
      salary_details: '',
      no_of_vacancy_required: '',
    },
  });

  const { fields: interviewFields, append: appendInterview, remove: removeInterview } = useFieldArray({
    control,
    name: 'interview_dates',
  });

  const { fields: jobRoleFields, append: appendJobRole, remove: removeJobRole } = useFieldArray({
    control,
    name: 'job_roles',
  });

  const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({
    control,
    name: 'certifications',
  });

  const onSubmit = async (data) => {
    // Ensure no_of_vacancies is set properly
    data.no_of_vacancies = data.no_of_vacancies ? parseInt(data.no_of_vacancies, 10) : null;

    // Handle job roles (assuming the first role is selected)
    data.job_roles = data.job_roles[0] || ''; // Ensure it sends a valid job role or an empty string

    // Convert no_of_vacancy_required to integer if provided
    data.no_of_vacancy_required = data.no_of_vacancy_required ? parseInt(data.no_of_vacancy_required, 10) : null;

    // Prepare interview details
    const interviewDetails = data.interview_dates.map(({ interview_date, interview_location }) => ({
      interview_date,
      interview_location,
    }));

    // Create the payload for submission
    const payload = {
      ...data,
      interview_dates: interviewDetails.map(i => i.interview_date).join(','), // Join dates for backend
      interview_locations: interviewDetails.map(i => i.interview_location).join(','), // Join locations for backend
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

          {/* Qualification Section */}
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

          {/* Gender Section */}
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

          {/* Area of Interest */}
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

          {/* Specialization */}
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

          {/* Experience */}
          <div className="form-group">
            <label htmlFor="experience">Experience (in years)</label>
            <input
              id="experience"
              type="number"
              className="input-field"
              {...register('experience', { required: 'Experience is required', min: 0 })}
            />
            {errors.experience && <p className="error">{errors.experience.message}</p>}
          </div>

          {/* Passed Out Year */}
          <div className="form-group">
            <label htmlFor="passed_out">Passed Out Year</label>
            <input
              id="passed_out"
              type="number"
              className="input-field"
              {...register('passed_out', { required: 'Passed Out Year is required', min: 1900, max: new Date().getFullYear() })}
            />
            {errors.passed_out && <p className="error">{errors.passed_out.message}</p>}
          </div>

          {/* Age No Ratio */}
          <div className="form-group">
            <label htmlFor="age_no_ratio">Age No Ratio</label>
            <input
              id="age_no_ratio"
              type="number"
              className="input-field"
              {...register('age_no_ratio', { required: 'Age No Ratio is required', min: 0 })}
            />
            {errors.age_no_ratio && <p className="error">{errors.age_no_ratio.message}</p>}
          </div>

          {/* Location */}
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

          {/* Work Type */}
          <div className="form-group">
            <label htmlFor="work_type">Work Type</label>
            <input
              id="work_type"
              type="text"
              className="input-field"
              {...register('work_type', { required: 'Work Type is required' })}
            />
            {errors.work_type && <p className="error">{errors.work_type.message}</p>}
          </div>

          {/* Number of Vacancies */}
          <div className="form-group">
            <label htmlFor="no_of_vacancies">Number of Vacancies</label>
            <input
              id="no_of_vacancies"
              type="number"
              className="input-field"
              {...register('no_of_vacancies', { required: 'Number of Vacancies is required', min: 1 })}
            />
            {errors.no_of_vacancies && <p className="error">{errors.no_of_vacancies.message}</p>}
          </div>

          {/* Salary Details */}
          <div className="form-group">
            <label htmlFor="salary_details">Salary Details</label>
            <input
              id="salary_details"
              type="text"
              className="input-field"
              {...register('salary_details', { required: 'Salary Details are required' })}
            />
            {errors.salary_details && <p className="error">{errors.salary_details.message}</p>}
          </div>

          {/* Number of Vacancy Required */}
          <div className="form-group">
            <label htmlFor="no_of_vacancy_required">Number of Vacancy Required</label>
            <input
              id="no_of_vacancy_required"
              type="number"
              className="input-field"
              {...register('no_of_vacancy_required', { required: 'Number of Vacancy Required is required', min: 1 })}
            />
            {errors.no_of_vacancy_required && <p className="error">{errors.no_of_vacancy_required.message}</p>}
          </div>

          {/* Interview Dates */}
          <div className="form-group">
            <label>Interview Dates</label>
            <button type="button" className="add-more" onClick={() => appendInterview({ interview_date: '', interview_location: '' })}>Add More</button>
            {interviewFields.map((field, index) => (
              <div key={field.id} className="interview-field">
                <input
                  type="date"
                  placeholder="Interview Date"
                  className="input-field"
                  {...register(`interview_dates.${index}.interview_date`, { required: 'Interview Date is required' })}
                />
                <input
                  type="text"
                  placeholder="Interview Location"
                  className="input-field"
                  {...register(`interview_dates.${index}.interview_location`, { required: 'Interview Location is required' })}
                />
                {interviewFields.length > 1 && (
                  <button type="button" className="remove" onClick={() => removeInterview(index)}>Remove</button>
                )}
              </div>
            ))}
            {errors.interview_dates && <p className="error">{errors.interview_dates.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetailsForm;
