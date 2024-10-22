import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API calls
import '../ClientRegistration/CompanyDetails.css';
import Header from '../../Home/Header/header';
import Footer from '../../Home/Footer/footer';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import { toast, ToastContainer } from 'react-toastify';  // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

function CompanyDetails() {
  const navigate = useNavigate(); // Initialize navigate for navigation
  const [linkedin, setLinkedin] = useState([{ company_social_media_Linkedin: '' }]);
  const [instagram, setInstagram] = useState([{ company_social_media_Instagram: '' }]);
  const [facebook, setFacebook] = useState([{ company_social_media_Facebook: '' }]);
  const [whatsapp_group, setWhatsapp_group] = useState([{ company_social_media_Whatsapp_group: '' }]);
  const [twitter, setTwitter] = useState([{ company_social_media_Twitter: '' }]);


  const [formData, setFormData] = useState({
    company_name: '',
    company_location: '',
    company_email: '',
    company_phone: '',
    company_department: '',
    company_employees: '',
    company_weblink: '',
    start_year: '',
    annual_income: '',
    net_profit: '',
    company_branch_no: '',
    company_certification: '',
    company_license: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSocialChange = (index, e) => {
    const { value } = e.target;
    const newLinkedin = [...linkedin];
    newLinkedin[index].company_social_media_Linkedin = value;
    setLinkedin(newLinkedin);
  };
  
  const handleInstagramChange = (index, e) => {
    const { value } = e.target;
    const newInstagram = [...instagram];
    newInstagram[index].company_social_media_Instagram = value;
    setInstagram(newInstagram);
  };

  const handleFacebookChange = (index, e) => {
    const { value } = e.target;
    const newFacebook= [...facebook];
    newFacebook[index].company_social_media_Facebook = value;
    setFacebook(newFacebook);
  };
  
  const handlewhatsappGroupChange = (index, e) => {
    const { value } = e.target;
    const newWhatsapp_group= [...whatsapp_group];
    newWhatsapp_group[index].company_social_media_Whatsapp_group = value;
    setWhatsapp_group(newWhatsapp_group);
  };

  const handleTwitterGroupChange = (index, e) => {
    const { value } = e.target;
    const newTwitter= [...twitter];
    newTwitter[index].company_social_media_Twitter = value;
    setTwitter(newTwitter);
  };
  
  // const addSocialField = () => {
  //   setSocialMedia([...socialMedia, { company_social_media: '' }]);
  // };

  // const removeSocialField = (index) => {
  //   const newSocialMedia = [...socialMedia];
  //   newSocialMedia.splice(index, 1);
  //   setSocialMedia(newSocialMedia);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
        ...formData,
        company_social_media_Linkedin: linkedin.map((social) => social.company_social_media_Linkedin),
        company_social_media_Instagram: instagram.map((social) => social.company_social_media_Instagram),
        company_social_media_Facebook: facebook.map((social) => social.company_social_media_Facebook),
        company_social_media_Whatsapp_group: whatsapp_group.map((social) => social.company_social_media_Whatsapp_group),
        company_social_media_Twitter: twitter.map((social) => social.company_social_media_Twitter),

        company_employees: parseInt(formData.company_employees, 10),
        start_year: parseInt(formData.start_year, 10),
        annual_income: parseFloat(formData.annual_income),
        net_profit: parseFloat(formData.net_profit),
    };

    try {
        await axios.post('http://localhost:8000/api/company-details/', data);
        
        // Show success toast
        toast.success('Registration successful!', {
            onClose: () => navigate('/client_welcome') // Navigate after the toast closes
        });
        
    } catch (error) {
        if (error.response?.data) {
          
            const validationErrors = error.response.data;
            let errorMessage = "There were errors in your form submission:\n";
            for (const field in validationErrors) {
                errorMessage += `${field}: ${validationErrors[field].join(', ')}\n`;
            }
            toast.error(errorMessage); // Show error toast
        } else {
            toast.error('Form submission failed. Please check the form data and try again.'); // General error message
        }
        console.error('Error submitting form:', error.response?.data || error.message);
    }
};

  
  return (
    <div className='details'>
      <Header />
      <form className="client-form1" onSubmit={handleSubmit}>
        <div className="section about">
          <h2>Company Details</h2>

          <label>Company Name</label>
          <input type="text" name="company_name" placeholder="Company Name" className="input-field" onChange={handleInputChange} />

          <label>Company Location</label>
          <input type="text" name="company_location" placeholder="Company Location" className="input-field" onChange={handleInputChange} />

          <label>Company Email</label>
          <input type="text" name="company_email" placeholder="Company Email" className="input-field" onChange={handleInputChange} />

          <label>Company Phone Number</label>
          <input type="text" name="company_phone" placeholder="Company Phone Number" className="input-field" onChange={handleInputChange} />

          <label>Linkedin</label>
          {linkedin.map((item, index) => (
            <div key={index} className="socialmedia-group">
              <input
                type="text"
                placeholder="Company linkedin Link"
                className="input-field"
                value={item.company_social_media_Linkedin} // Use correct key
                onChange={(e) => handleSocialChange(index, e)}
              />
              {/* <div className="button-group">
                <button type="button" className="add-more" onClick={addSocialField}>+ Add More</button>
                {socialMedia.length > 1 && (
                  <button type="button" className="remove" onClick={() => removeSocialField(index)}>- Remove</button>
                )}
              </div> */}
            </div>
          ))}


<label>Instagram</label>
          {instagram.map((item, index) => (
            <div key={index} className="socialmedia-group">
              <input
                type="text"
                placeholder="Company Instagram Link"
                className="input-field"
                value={item.company_social_media_Instagram} // Use correct key
                onChange={(e) => handleInstagramChange(index, e)}
              />
      
            </div>
          ))}


<label>Facebook</label>
          {facebook.map((item, index) => (
            <div key={index} className="socialmedia-group">
              <input
                type="text"
                placeholder="Company Facebook Link"
                className="input-field"
                value={item.company_social_media_Facebook} // Use correct key
                onChange={(e) => handleFacebookChange(index, e)}
              />
             
            </div>
          ))}




<label>Whatsapp group</label>
          {whatsapp_group.map((item, index) => (
            <div key={index} className="socialmedia-group">
              <input
                type="text"
                placeholder="Company Whatsapp Link"
                className="input-field"
                value={item.company_social_media_Whatsapp_group} // Use correct key
                onChange={(e) => handlewhatsappGroupChange(index, e)}
              />
              
            </div>
          ))} 

          <label>Twitter</label>
          {twitter.map((item, index) => (
            <div key={index} className="socialmedia-group">
              <input
                type="text"
                placeholder="Company Twitter Link"
                className="input-field"
                value={item.company_social_media_Twitter} // Use correct key
                onChange={(e) => handleTwitterGroupChange(index, e)}
              />
            </div>
          ))}


<label>Company Weblink</label>
<input type="text" name="company_weblink" placeholder="Company Weblink" className="input-field" onChange={handleInputChange} />

          <label>Company Department</label>
          <input type="text" name="company_department" placeholder="Company Department" className="input-field" onChange={handleInputChange} />

          

          <label>Company No. of Employees</label>
          <input type="number" name="company_employees" placeholder="Company No. of Employees" className="input-field" onChange={handleInputChange} />

          

          <label>Start Year</label>
          <input type="number" name="start_year" placeholder="Start Year" className="input-field" onChange={handleInputChange} />

          <label>Annual Income</label>
          <input type="number" name="annual_income" placeholder="Annual Income" className="input-field" onChange={handleInputChange} />

          <label>Net Profit</label>
          <input type="number" name="net_profit" placeholder="Net Profit" className="input-field" onChange={handleInputChange} />

          <label>Company Branch No</label>
          <input type="text" name="company_branch_no" placeholder="Company Branch No" className="input-field" onChange={handleInputChange} />

          <label>Company Certification</label>
          <input type="text" name="company_certification" placeholder="Company Certification" className="input-field" onChange={handleInputChange} />

          <label>Company License</label>
          <input type="text" name="company_license" placeholder="Company License" className="input-field" onChange={handleInputChange} />
        </div>

        <div className="client-submit-div">
          <button type="submit" className="client-submit-button">Submit</button>
          <button type="button" className="cancel-button" onClick={() => navigate('/client_welcome')}>Cancel</button>
        </div>
      </form>
      <Footer />
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default CompanyDetails;