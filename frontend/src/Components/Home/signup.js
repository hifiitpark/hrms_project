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
import Footer from "./Footer/footer";
import Header from "./Header/header";

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
      [e.target.name]: e.target.value
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch("http://localhost:8000/api/signup/", {
      method: "POST",
      body: JSON.stringify(FormData),
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Make sure you're sending the correct data
    });
  
    const data = await response.json();
    if (response.ok) {
      alert("Signup successful");

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });

      navigate("/choose_user_type");
    } else {
      alert("Signup failed");
      console.error(data);
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
              {/* ...image and content... */}
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
