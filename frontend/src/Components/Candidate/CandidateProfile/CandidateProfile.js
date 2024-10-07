import React from 'react';
import './CandidateProfile.css'
import profile from '../CandidateProfile/Assets/user_img.jpg'
import CandidateHeader from '../CandidateHeader/CandidateHeader';
import Footer from '../../Home/Footer/footer';
import { Link } from 'react-router-dom';

const CandidateProfile = () => {
  return (
    <div>
      <CandidateHeader/>
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <img src={profile} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>Name</h2>
          <p>Role (Area of Interest)</p>
          <p>Location (Current City)</p>
          <Link to='/candidate_reg'>
          <button>Update Profile</button></Link>
        </div>
      </div>
      <div className="profile-objective">
        <h3>Objective</h3>
        <p>
          Creative fashion designer with an excellent understanding of fashion trends and techniques,
          manual design, and CAD. 10+ years of experience specializing in fashion items that remain 
          fashion-forward in the market. Proficient in fashion design from concept through production, 
          and adept in utilizing various design tools for digital transformation.
        </p>
      </div>
      <div className="profile-sections">
        <div className="profile-skills">
          <h3>Skills</h3>
          <ul>
            <li>Java</li>
            <li>SQL</li>
            <li>PHP</li>
          </ul>
          <h3>Languages</h3>
          <ul>
            <li>Tamil</li>
            <li>English</li>
            <li>Hindi</li>
          </ul>
        </div>
        <div className="profile-about">
          <h3>About Me</h3>
          <ul>
            <li>Fresher</li>
            <li>Gender</li>
            <li>D.O.B</li>
            <li>Phone no.</li>
            <li>Gmail</li>
            <li>LinkedIn</li>
          </ul>
        </div>
        <div className="profile-education">
          <h3>Education</h3>
          <ul>
            <li>Higher Studies</li>
            <li>Lower Studies</li>
          </ul>
        </div>
        <div className="profile-courses">
          <h3>Courses Completed</h3>
          <ul>
            <li>Front end</li>
            <li>FullStack</li>
            <li>UI/UX Design</li>
          </ul>
        </div>
      </div>
      <div className="profile-footer">
        <Link to='/candidate_dashboard'>
        <button>Back</button></Link>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default CandidateProfile;
