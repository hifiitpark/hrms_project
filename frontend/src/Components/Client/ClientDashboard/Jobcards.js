import React from 'react';
import './JobCards.css';
import { MdEdit } from "react-icons/md";

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3>{job.company}</h3>
      <p>{job.role}</p>
      <p>{job.salary}</p>
      <p>{job.vacancies}</p>
      <button className="edit-button">
        <MdEdit /> Edit
      </button>
    </div>
  );
}

export default JobCard;
