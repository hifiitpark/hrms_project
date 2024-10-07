import React, { useState } from 'react';
import './ChooseUserType.css';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { Link } from 'react-router-dom';

const ChooseUserType = () => {
  const [selectedUserType, setSelectedUserType] = useState('');

  const handleSelection = (type) => {
    setSelectedUserType(type);
  };

  return (
    <div>
      <Header/>
    <div className="cut_container">
      <h1>Choose User Type</h1>
      <div className="user-types">
        <Link className='candidate_link' to="/candidate_reg">
        <div
          className={`user-type ${selectedUserType === 'candidate' ? 'selected' : ''}`}
          onClick={() => handleSelection('candidate')}
        >
          <input
            type="radio"
            id="candidate"
            name="userType"
            value="candidate"
            checked={selectedUserType === 'candidate'}
            onChange={() => handleSelection('candidate')}
          />
          <label htmlFor="candidate">
            <h2>Candidate</h2>
            <p>If you are a Candidate please select this</p>
          </label>
        </div>
        </Link>
        <Link className='candidate_link' to="/client_reg">
        <div
          className={`user-type ${selectedUserType === 'client' ? 'selected' : ''}`}
          onClick={() => handleSelection('client')}
        >
          <input
            type="radio"
            id="client"
            name="userType"
            value="client"
            checked={selectedUserType === 'client'}
            onChange={() => handleSelection('client')}
          />
          <label htmlFor="client">
            <h2>Client</h2>
            <p>If you are a Client please select this</p>
          </label>
        </div>
        </Link>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ChooseUserType;
