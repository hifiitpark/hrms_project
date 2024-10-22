import React, { useState } from 'react';
import axios from 'axios';
import './HRDetailsForm.css';
import { getCookie } from '../../../utils/getCookie';

function HRDetailsForm() {
    const [HRdetails, setHRDetails] = useState([
        { hr_name: '', hr_phone_number: '', hr_email: '', hr_social_media: '' }
    ]);
    

    const handleHRDetails = (index, e) => {
        const { name, value } = e.target;
        const newHRDetails = [...HRdetails];
        newHRDetails[index][name] = value;
        setHRDetails(newHRDetails);
    };

    const addHRDetails = () => {
        setHRDetails([...HRdetails, { hr_name: '', hr_phone_number: '', hr_email: '', hr_social_media: '' }]);
    };

    const removeHRDetails = (index) => {
        const newHRDetails = [...HRdetails];
        newHRDetails.splice(index, 1);
        setHRDetails(newHRDetails);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');
    
        try {
            const response = await fetch('http://localhost:8000/api/hrdetails/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify(HRdetails[0])  // Adjust if you want to submit multiple details
            });
    
            if (response.ok) {
                alert('HR Details submitted successfully!');
            } else {
                alert('Error submitting HR Details.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <div className='detail'>
            <form onSubmit={handleSubmit}>
                {HRdetails.map((items, index) => (
                    <div key={index} className="socialmedia-group">
                        <div className="section about">
                            <h2>HR Details</h2>
                            <label>HR Name</label>
                            <input
                                type="text"
                                name="hr_name"
                                placeholder="HR Name"
                                className="input-field"
                                value={items.hr_name}
                                onChange={(e) => handleHRDetails(index, e)}
                            />

                            <label>HR Phone Number</label>
                            <input
                                type="text"
                                name="hr_phone_number"
                                placeholder="HR Phone Number"
                                className="input-field"
                                value={items.hr_phone_number}
                                onChange={(e) => handleHRDetails(index, e)}
                            />

                            <label>HR Email</label>
                            <input
                                type="email"
                                name="hr_email"
                                placeholder="HR Email"
                                className="input-field"
                                value={items.hr_email}
                                onChange={(e) => handleHRDetails(index, e)}
                            />

                            <label>HR Social Media</label>
                            <input
                                type="text"
                                name="hr_social_media"
                                placeholder="HR Social Media"
                                className="input-field"
                                value={items.hr_social_media}
                                onChange={(e) => handleHRDetails(index, e)}
                            />

                            <div className="button-group">
                                <button type="button" className="add-more" onClick={addHRDetails}>+ Add More</button>
                                {HRdetails.length > 1 && (
                                    <button type="button" className="remove" onClick={() => removeHRDetails(index)}>- Remove</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="submit-div">
                    <button type="submit" className="submit-button">Submit</button>
                    <button type="button" className="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default HRDetailsForm;