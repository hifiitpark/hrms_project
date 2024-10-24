import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer/footer";
import Header from "./Header/header";

// Utility function to get the CSRF token from cookies
function getCookie(name) {
  // Existing function for retrieving CSRF token
}

const ResponsiveBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

function Signup() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Generate OTP and send to email
      const otpResponse = await axios.post(
        "http://localhost:8000/api/send_otp/", // API to send OTP
        { email: formData.email },
        {
          headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Content-Type": "application/json",
          },
        }
      );

      if (otpResponse.status === 200) {
        alert("An OTP has been sent to your email.");
        localStorage.setItem("signupEmail", formData.email); // Store email for verification
        localStorage.setItem("signupData", JSON.stringify(formData)); // Temporarily store the form data
        navigate("/verify_otp"); // Redirect to OTP verification page
      } else {
        alert(
          "Failed to send OTP: " + (otpResponse.data.detail || "Please try again.")
        );
        console.error(otpResponse.data);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <Header />
      <Box
        sx={{
          bgcolor: "#b8a5fe",
          minHeight: "66.4vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            bgcolor: "#fff",
            boxShadow: 3,
            borderRadius: 2,
            overflow: "hidden",
            p: 2,
            marginBottom: 2,
          }}
        >
          <ResponsiveBox sx={{ display: "flex" }}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: 2,
              }}
            >
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                fontWeight={"bold"}
              >
                Welcome Back!
              </Typography>
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                fontWeight={"bold"}
              >
                Welcome to your next opportunity.
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Log in to connect with top employers and take the next step in
                your career journey.
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} sx={{ p: 2 }}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                fontWeight={"bold"}
              >
                Sign Up
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  placeholder="First Name"
                  name="first_name"
                  variant="standard"
                  fullWidth
                  value={formData.first_name}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      border: "2px solid #ccc",
                      borderRadius: "20px",
                      padding: "10px 20px",
                    },
                  }}
                />
                <TextField
                  placeholder="Last Name"
                  name="last_name"
                  variant="standard"
                  fullWidth
                  value={formData.last_name}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      border: "2px solid #ccc",
                      borderRadius: "20px",
                      padding: "10px 20px",
                    },
                  }}
                />
                <TextField
                  placeholder="E-mail"
                  name="email"
                  variant="standard"
                  fullWidth
                  value={formData.email}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      border: "2px solid #ccc",
                      borderRadius: "20px",
                      padding: "10px 20px",
                    },
                  }}
                />
                <TextField
                  placeholder="Password"
                  name="password"
                  type="password"
                  variant="standard"
                  fullWidth
                  value={formData.password}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      border: "2px solid #ccc",
                      borderRadius: "20px",
                      padding: "10px 20px",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    mb: 2,
                    backgroundColor: "#c5cae9",
                    color: "black",
                    textTransform: "capitalize",
                  }}
                >
                  Signup
                </Button>
              </form>
            </Grid>
          </ResponsiveBox>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}

export default Signup;
