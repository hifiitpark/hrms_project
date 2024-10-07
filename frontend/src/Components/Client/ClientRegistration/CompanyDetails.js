import React, { useState } from 'react';
import '../ClientRegistration/CompanyDetails.css'
import Header from '../../Home/Header/header';
import Footer from '../../Home/Footer/footer';
import { Link } from 'react-router-dom';

function CompanyDetails() {

    const [socialMedia, setSocialMedia] = useState([{ companySocialMedia: '' }]);

    const handleSocialChange = (index, e) => {
      const { name, value } = e.target;
      const newSocialMedia = [...socialMedia];
      newSocialMedia[index][name] = value;
      setSocialMedia(newSocialMedia);
    };
  
    const addSocialField = () => {
      setSocialMedia([...socialMedia, { companySocialMedia: '' }]);
    };
  
    const removeSocialField = (index) => {
      const newSocialMedia = [...socialMedia];
      newSocialMedia.splice(index, 1);
      setSocialMedia(newSocialMedia);
    };

  return (
    <div className='details'>
      <Header/>
            <form className="client-form1">
      <div className="section about">
        <h2>Company Details</h2>

        <label>Company Name</label>
        <input type="text" name="companyName" placeholder="Company Name" className="input-field" />

        <label>Company Location</label>
        <input type="text" name="companyLocation" placeholder="Company Location" className="input-field" />

        <label>Company Email</label>
        <input type="text" name="companyEmail" placeholder="Company Email" className="input-field" />

        <label>Company Phone Number</label>
        <input type="text" name="companyPhone" placeholder="Company Phone Number" className="input-field" />
    
        <label>Company Social Media</label>
        {socialMedia.map((socialmedia, index) => (
          <div key={index} className="socialmedia-group">
            <input type="text" name="companySocialMedia" placeholder="company Social Media" className="input-field" value={socialmedia.companySocialMedia} onChange={(e) => handleSocialChange(index, e)} />
            <div className="button-group">
              <button type="button" className="add-more" onClick={addSocialField}>+ Add More</button>
              {socialMedia.length > 1 && (
                <button type="button" className="remove" onClick={() => removeSocialField(index)}>- Remove</button>
              )}
            </div>
          </div>
        ))}

        <label>Company Department</label>
        <input type="text" name="companyDepartment" placeholder="Company Department" className="input-field" />

        <label>Company no-of-employees</label>
        <input type="text" name="companyNo.of.Employees" placeholder="Company No.of.Employees" className="input-field" />

        <label>Company Weblink</label>
        <input type="text" name="companyWeblink" placeholder="Company Weblink" className="input-field" />

        <label>Start Year</label>
        <input type="text" name="startYear" placeholder="Start Year" className="input-field" />

        <label>Annual Income</label>
        <input type="text" name="annualIncome" placeholder="Annual Income" className="input-field" />

        <label>Net Profit</label>
        <input type="text" name="netProfit" placeholder="Net Profit" className="input-field" />

        <label>Company Branch No</label>
        <input type="text" name="companyBranchNo" placeholder="Company Branch No" className="input-field" />

        <label>Company Certification</label>
        <input type="text" name="companyCertification" placeholder="Company Certification" className="input-field" />

        <label>Company License</label>
        <input type="text" name="companyLicense" placeholder="Company License" className="input-field" />
      </div>



      <div className="client-submit-div">
        <Link to="/client_welcome">
        <button type="submit" className="client-submit-button">Submit</button>
        </Link>
        <button type="submit" className="cancel-button">Cancel</button>
      </div>
    </form>
    <Footer/>
    </div>
  )
}

export default CompanyDetails