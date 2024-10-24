import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../utils/getCookie";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [email] = useState(localStorage.getItem("signupEmail")); // Assuming you store email in localStorage
  const signupData = JSON.parse(localStorage.getItem("signupData")); // Retrieve form data from localStorage
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log("Email:", email);  // Log email for debugging
        console.log("OTP:", otp);  // Log OTP for debugging

        // Verify OTP
        const otpResponse = await axios.post("http://localhost:8000/api/verify_otp/", {
            email: email,
            otp: otp,
        });

        if (otpResponse.status === 200) {
            console.log("OTP verified successfully:", otpResponse.data);

            // If OTP is verified, proceed to sign up the user with the saved data
            try {
                const signupResponse = await axios.post(
                    "http://localhost:8000/api/register/", // API endpoint for user registration
                    signupData,
                    {
                        headers: {
                            "X-CSRFToken": getCookie("csrftoken"),
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (signupResponse.status === 201) {
                    alert("Signup successful!");
                    navigate("/login"); // Redirect to login or another page
                } else {
                    console.error("Signup failed:", signupResponse.data);
                    alert("Signup failed: " + (signupResponse.data.detail || "Please try again."));
                }
            } catch (signupError) {
                console.error("Error during signup:", signupError.response ? signupError.response.data : signupError);
                alert("An error occurred during signup. Please try again.");
            }
        } else {
            console.warn("OTP verification failed with response:", otpResponse.data);
            alert("OTP verification failed. Please try again.");
        }
    } catch (otpError) {
        console.error("Error verifying OTP:", otpError.response ? otpError.response.data : otpError);
        if (otpError.response && otpError.response.status === 400) {
            alert(otpError.response.data.detail || "OTP verification failed.");
        } else {
            alert("An unexpected error occurred. Please try again.");
        }
    }
};


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        OTP Verification
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Verify OTP
        </Button>
      </form>
    </Container>
  );
}

export default VerifyOtp;
