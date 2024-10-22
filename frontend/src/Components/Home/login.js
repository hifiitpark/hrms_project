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

function Login() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      navigate("/dashboard"); // Redirect to dashboard after login
    } else {
      alert("Login failed. Please check your credentials.");
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
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Link to="/forgot">
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  Forgot Password?
                </Box>
              </Link>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mb: 2, bgcolor: "#b8a5fe" }}
                onClick={handleLogin}
              >
                Login
              </Button>

              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link to="/signup">Signup</Link>
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
