import React from 'react';
import './ClientProfile.css'
import profile from '../Assets/kathir.jpg'
import ClientHeader from '../ClientHeader/ClientHeader';
import Footer from '../../Home/Footer/footer';
import { Link } from 'react-router-dom';

const ClientProfile = () => {
  return (
    <div>
      <ClientHeader/>
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <img src={profile} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>Company Name</h2>
          <p>Domain</p>
          <p>Currently</p>
          <Link to='/client_reg'>
          <button>Update Profile</button></Link>
        </div>
      </div>
      <div className="profile-objective">
        <h3>Description</h3>
        <p>
          Creative fashion designer with an excellent understanding of fashion trends and techniques,
          manual design, and CAD. 10+ years of experience specializing in fashion items that remain 
          fashion-forward in the market. Proficient in fashion design from concept through production, 
          and adept in utilizing various design tools for digital transformation.
        </p>
      </div>
      <div className="profile-sections">
        <div className="profile-skills">
          <h3>Company Details</h3>
          <ul>
            <li>No Of Branches</li>
            <li>Location</li>
            <li>Since</li>
          </ul>
          
          <ul>
            <li>Industry </li>
            <li>No Of Employees</li>
          </ul>
        </div>
        <div className="profile-about">
          <h3>About Us</h3>
          <ul>
            <li>Domain</li>
            <li>MNC</li>
            <li>Mission</li>
            <li>Vision</li>
          </ul>
        </div>
        <div className="profile-education">
          <h3>Contact</h3>
          <ul>
            <li>Phone Number</li>
            <li>Whatsapp</li>
            <li>Mail</li>
            <li>Website</li>
            <li>Linkedin</li>
            <li>Instagram</li>
            <li>Facebook</li>
          </ul>
        </div>
     
      </div>
      <div className="profile-footer">
        <Link to='/client_dashboard'>
        <button>Back</button></Link>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ClientProfile