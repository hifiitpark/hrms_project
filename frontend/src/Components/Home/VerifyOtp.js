// src/Components/Home/VerifyOtp.js
import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("signupEmail")); // Assuming you store email in localStorage
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/verify_otp/", {
                email: email,
                otp: otp,
            });
            if (response.status === 200) {
                alert("OTP verified successfully!");
                navigate("/login"); // Redirect to login or another page after successful verification
            }
        } catch (error) {
            alert("OTP verification failed. Please try again.");
            console.error("Error verifying OTP:", error);
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
