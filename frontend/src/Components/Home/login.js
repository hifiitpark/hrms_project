import React, { useState } from "react";
import { Grid, Box, Typography, TextField, Button, useTheme, useMediaQuery } from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header/header";
import Footer from "./Footer/footer";
import img2 from "../Assets/loginimg/welcome1.png";

function Login() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" }); // Change username to email

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Use the correct API endpoint for login
    const response = await fetch("http://localhost:8000/api/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email, // Ensure you're sending the email field
        password: formData.password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // Save the tokens in local storage or state
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      alert("Login successful");
      navigate("/some-path"); // Replace with the path you want to navigate to
    } else {
      alert("Login failed: " + (data.detail || "An error occurred."));
    }
  };

  return (
    <Box sx={{ backgroundColor: "#b8a5fe" }}>
      <Header />
      <Grid container justifyContent="center">
        <Grid item xs={11} sm={11} md={6} lg={5} marginTop={12} marginBottom={10} border={"3px solid gray"} borderRadius={"10px"}>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", backgroundColor: "#fff", borderRadius: "10px", boxShadow: 3, overflow: "hidden" }}>
            <Box sx={{ flex: 1, borderRight: isSmallScreen ? "none" : "1px solid #000", borderBottom: isSmallScreen ? "1px solid #000" : "none", textAlign: "center", p: 3 }}>
              <Typography variant="h4" gutterBottom>Welcome Back!</Typography>
              <Typography variant="h6" gutterBottom>Welcome to your next opportunity.</Typography>
              <Typography variant="body1">Log in to connect with top employers and take the next step in your career journey.</Typography>
              <Box mt={4}>
                <img src={img2} alt="Welcome" style={{ width: "80%", height: "auto" }} />
              </Box>
            </Box>

            <Box sx={{ flex: 1, p: 3 }}>
              <Typography variant="h4" align="center" gutterBottom>Login Form</Typography>
              <TextField 
                fullWidth 
                label="Email" // Change the label to reflect email input
                name="email" // Change to email field
                variant="outlined" 
                sx={{ mb: 3 }} 
                onChange={handleInputChange} 
              />
              <TextField 
                fullWidth 
                label="Password" 
                type="password" 
                name="password" 
                variant="outlined" 
                sx={{ mb: 3 }} 
                onChange={handleInputChange} 
              />
              <Link to="/forgot"><Box sx={{ textAlign: "center", mb: 2 }}>Forgot Password?</Box></Link>
              <Button fullWidth variant="contained" color="primary" sx={{ mb: 2, bgcolor: "#b8a5fe" }} onClick={handleLogin}>Login</Button>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="body2">Don't have an account? <Link to="/signup">Signup</Link></Typography>
              </Box>
              <Button fullWidth variant="outlined" startIcon={<FaGoogle />} sx={{ mt: 2 }}>Continue with Google</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}

export default Login;
