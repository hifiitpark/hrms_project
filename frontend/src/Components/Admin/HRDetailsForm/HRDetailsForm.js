import React, { useState } from 'react';
import './HRDetailsForm.css';

function HRDetailsForm() {

    const [HRdetails, setHRDetails] = useState([{ HRName: '', HRPhoneNumber: '', HREmail: '', HRSocialMedia: '' }]);

    const handleHRDetails = (index, e) => {
        const { name, value } = e.target;
        const newHRDetails = [...HRdetails];
        newHRDetails[index][name] = value;
        setHRDetails(newHRDetails);
    };

    const addHRDetails = () => {
        setHRDetails([...HRdetails, { HRName: '', HRPhoneNumber: '', HREmail: '', HRSocialMedia: '' }]);
    };

    const removeHRDetails = (index) => {
        const newHRDetails = [...HRdetails];
        newHRDetails.splice(index, 1);
        setHRDetails(newHRDetails);
    };

    return (
        <div className='detail'>
            <form>
                {HRdetails.map((HRDetail, index) => (
                    <div key={index} className="socialmedia-group">
                        <div className="section about">
                            <h2>HR Details</h2>
                            <label>HR Name</label>
                            <input
                                type="text"
                                name="HRName"
                                placeholder="HR Name"
                                className="input-field"
                                value={HRDetail.HRName}
                                onChange={(e) => handleHRDetails(index, e)}
                            />

                            <label>HR Phone Number</label>
                            <input
                                type="text"
                                name="HRPhoneNumber"
                                placeholder="HR Phone Number"
                                className="input-field"
                                value={HRDetail.HRPhoneNumber}
                                onChange={(e) => handleHRDetails(index, e)}
                            />

                            <label>HR Email</label>
                            <input
                                type="text"
                                name="HREmail"
                                placeholder="HR Email"
                                className="input-field"
                                value={HRDetail.HREmail}
                                onChange={(e) => handleHRDetails(index, e)}
                            />

                            <label>HR Social Media</label>
                            <input
                                type="text"
                                name="HRSocialMedia"
                                placeholder="HR Social Media"
                                className="input-field"
                                value={HRDetail.HRSocialMedia}
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

   