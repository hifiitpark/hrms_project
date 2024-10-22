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

function Signup() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const response = await fetch("http://localhost:8000/api/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      navigate("/login"); // Redirect to login after successful signup
    } else {
      alert("Signup failed. Please check your details.");
    }
  };

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
                Create an Account
              </Typography>
              <Typography variant="body1" gutterBottom>
                Join us and take the next step in your career.
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
                Signup Form
              </Typography>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 3 }}
              />
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
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="body2">
                  Already have an account? <Link to="/login">Login</Link>
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mb: 2, bgcolor: "#b8a5fe" }}
                onClick={handleSignup}
              >
                Signup
              </Button>

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

export default Signup;
