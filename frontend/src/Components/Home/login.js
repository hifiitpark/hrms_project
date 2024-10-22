// Login.js

import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import img2 from "../Assets/loginimg/welcome1.png";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header/header";
import Footer from "./Footer/footer";
import axios from 'axios';
import { getCookie } from '../../utils/getCookie';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('usha');
      const response = await axios.post(
        'http://localhost:8000/api/token/', // Correct endpoint for JWT token
        {
          username: email, // Use 'username' if that is how you're set up, otherwise keep 'email' if your backend uses that
          password: password,
        },
        {
          headers: {
            'X-CSRFToken': getCookie('csrftoken'), // Ensure the CSRF token is correctly fetched
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) { // Check for a successful response
        const data = response.data;
        if (data.access) { // Adjusted for access token
          localStorage.setItem('authToken', data.access); // Store the access token
          alert("Login successful");
          navigate("/candidate_dashboard"); // Redirect to a secure page after successful login
        } else {
          alert("Login failed: Token not found in response.");
        }
      } else {
        alert("Login failed: Please check your credentials and try again.");
        console.error(response.data);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("Unauthorized: Incorrect credentials. Please try again.");
        } else if (error.response.status === 500) {
          alert("Internal Server Error: Please try again later.");
        } else {
          alert("An error occurred during login. Please try again later.");
        }
      } else {
        alert("Network error: Please check your connection and try again.");
      }
      console.error("Error:", error);
    }
  }

  return (
    <Box sx={{ backgroundColor: "#b8a5fe" }}>
      <Header />
      <Grid container justifyContent="center">
        <Grid
          item
          xs={11}
          sm={11}
          md={6}
          lg={5}
          marginTop={12}
          marginBottom={10}
          border={"3px solid gray"}
          borderRadius={"10px"}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: 3,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                flex: 1,
                borderRight: isSmallScreen ? "none" : "1px solid #000",
                borderBottom: isSmallScreen ? "1px solid #000" : "none",
                textAlign: "center",
                p: 3,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Welcome Back!
              </Typography>
              <Typography variant="h6" gutterBottom>
                Welcome to your next opportunity.
              </Typography>
              <Typography variant="body1">
                Log in to connect with top employers and take the next step in
                your career journey.
              </Typography>
              <Box mt={4}>
                <img
                  src={img2}
                  alt="Welcome"
                  style={{ width: "80%", height: "auto" }}
                />
              </Box>
            </Box>

            <Box sx={{ flex: 1, p: 3 }}>
              <Typography variant="h4" align="center" gutterBottom>
                Login Form
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 3 }}
                />
                <Link to="/forgot">
                  <Box sx={{ textAlign: "center", mb: 2 }}>Forgot Password?</Box>
                </Link>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mb: 2, bgcolor: "#b8a5fe" }}
                >
                  Login
                </Button>
              </form>

              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="body2">
                  Don't have an account? <Link to="/signup">Signup</Link>
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<FaGoogle />}
                sx={{ mt: 2 }}
              >
                Continue with Google
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}

export default Login;
