import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import img3 from "../Assets/loginimg/newlogo.jpeg";
import { Link } from "react-router-dom";
import Footer from "./Footer/footer";
import Header from "./Header/header";

function Forgot() {
  return (
    <div>
      <Header/>
    <Box
      sx={{
        backgroundColor: "#b8a5fe",
        minHeight: "66.4vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        <Box sx={{ marginBottom: 3 }}>
          <img
            src={img3}
            alt="Logo"
            style={{ height: 160, objectFit: "cover", marginBottom: 16 }}
          />
          <Typography variant="h5" gutterBottom>
            Mail Verification
          </Typography>
          <Typography variant="body2">
            Enter your email and we'll send you a link to reset your Password
          </Typography>
        </Box>
        <TextField
          variant="standard"
          placeholder="Hifiitpark@gmail.com"
          sx={{ marginBottom: 3 }}
          InputProps={{
            disableUnderline: true,
            style: {
              border: "2px solid #ccc",
              borderRadius: "20px",
              padding: "10px 60px 10px 20px",
            },
          }}
        />
        
        <br />
        <br />
        <Link to="/otp">
        <Button
          variant="contained"
          color="success"
          sx={{
            marginBottom: 2,
            textTransform: "capitalize",
            padding: "10px 30px 10px 30px",
          }}
        >
          Verify
        </Button>
        </Link>
        <Grid>
         <Link to="/login"> <Button style={{ textTransform: "capitalize" }}>Back to Login</Button></Link>
        </Grid>
      </Container>
    </Box>
    <Footer/>
    </div>
  );
}

export default Forgot;
