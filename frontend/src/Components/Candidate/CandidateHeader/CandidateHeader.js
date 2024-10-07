import React, { useState } from 'react';
import '../CandidateHeader/CandidateHeader.css';
import logo from '../CandidateHeader/Assets/hrmslogo.jpg';
import cover from '../CandidateHeader/Assets/orange.jpeg';
import profile from '../CandidateHeader/Assets/Arun.jpg';
import { FaSearch, FaBars } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

function CandidateHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
      <header className='can-main'>
        <div className='can-header'>
          <div className='can-inside'>
            <div className='can-header_logo'>
              <img className='hrmslogo' src={logo} alt="HRMS Logo" />
            </div>
            <div className={`can-search-container ${isMobileMenuOpen ? 'open' : ''}`}>
              <input className='can-search-text' placeholder='Search' />
              <div className='can-search-icon'><FaSearch /></div>
              <Link to="/candidate_job" className='can-view-profile' ><button className='can-job'>Jobs</button></Link>

              {/* mediaquery */}
              <Link to="/candidate_job" className='can-view-profile' ><button className='can-profile-button'>Jobs</button></Link>
              <button className='can-profile-button'>notification</button>
              <Link to="/candidate_profile" className='can-view-profile' ><button className='can-profile-button'>View Profile</button></Link>
              <button className='can-profile-button'>Saved Jobs</button>
              <button className='can-profile-button'>Enquiry</button>
              <button className='can-profile-button'>Logout</button>


              {/*  */}

              <div className='can-notification-icon'><IoMdNotifications /></div>
              
              <div className='can-dropdown'>
                  <div className='profileimg'><CgProfile /></div>
                <div className="can-dropdown-content">
                  <div className="can-cover">
                    <img src={cover} className="image1" alt="Cover" />
                    <img src={profile} className="image2" alt="Profile" />
                  </div>
                  <p>Arun S<br />arunpthurai28@gmail.com</p><br />
                  <a href="/candidate_profile">View Profile</a>
                  <a href="#">Match Job</a>
                  <a href="#">Saved Jobs</a>
                  <a href="#">Enquiry</a>
                  <a href="/">LOG OUT</a>
                </div>
              </div>
            </div>
            <div className='can-mobile-menu-icon' onClick={toggleMobileMenu}>
              <FaBars />
            </div>
          </div>
        </div>
      </header>
  );
}

export default CandidateHeader;
