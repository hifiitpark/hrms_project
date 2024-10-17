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
import Footer from "./Footer/footer"; // Ensure these paths are correct
import Header from "./Header/header"; // Ensure these paths are correct

// Styled component for responsive layout
const ResponsiveBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
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

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/api/signup/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.text(); // Fetch error response
        console.error("Error response:", errorData);
        alert("Signup failed: " + errorData);
        return;
      }

      const data = await response.json();
      alert("Signup successful");

      // Reset the form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });

      navigate("/choose_user_type"); // Redirect to the next page
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again later.");
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
          <ResponsiveBox>
            <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", p: 2 }}>
              <Typography variant="h4" align="center" gutterBottom fontWeight={"bold"}>
                Welcome!
              </Typography>
              <Typography variant="h6" align="center" gutterBottom fontWeight={"bold"}>
                Join us and start your journey!
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Create your account to connect with top employers and take the next step in your career journey.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ p: 2 }}>
              <Typography variant="h4" align="center" gutterBottom fontWeight={"bold"}>
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
