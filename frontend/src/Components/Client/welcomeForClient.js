import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import "@dotlottie/player-component"; // Import dotlottie player
import { Link } from "react-router-dom";

const WelcomeForClient = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#b8a5fe",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          width: {
            xs: "100%", // full width on extra small screens
            sm: "90%", // 90% width on small screens
            md: "80%", // 80% width on medium screens
            lg: "70%", // 70% width on large screens
            xl: "60%", // 60% width on extra large screens
          },
          maxWidth: "1320px",
          height: {
            xs: "auto", // auto height on small screens
            md: "600px", // fixed height on medium and larger screens
          },
          display: "flex",
          flexDirection: {
            xs: "column", // stack content vertically on small screens
            md: "row", // align content horizontally on medium and larger screens
          },
          border: "1px solid black",
          borderRadius: "5px",
          padding: {
            xs: "1rem",
            md: "2rem",
          },
        }}
      >
        <Box
          sx={{
            marginLeft: {
              xs: 0, // no left margin on small screens
              md: "3rem", // margin on medium and larger screens
            },
            marginBottom: {
              xs: "2rem", // margin-bottom for spacing on small screens
              md: 0, // no margin-bottom on larger screens
            },
            width: {
              xs: "100%", // full width on small screens
              md: "50%", // 50% width on medium screens and up
            },
            height: "auto",
          }}
        >
          <dotlottie-player
            src="https://lottie.host/81f4cdfe-b6d6-4892-bc07-6c29adfef68b/2q9Xylg9wH.json"
            background="transparent"
            speed="2"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          ></dotlottie-player>
        </Box>
        <Box
          sx={{
            marginTop: {
              xs: "2rem",
              md: "4rem",
            },
            marginLeft: {
              xs: 0,
              md: "3rem",
            },
            width: {
              xs: "100%",
              md: "50%",
            },
            textAlign: {
              xs: "center", // center text on small screens
              md: "left", // left-align text on medium and larger screens
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "rgb(19, 19, 101)",
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: {
                xs: "1.5rem", // smaller font size on small screens
                md: "2rem", // default font size on medium and larger screens
              },
              marginBottom: "1.5rem",
            }}
          >
            WELCOME To Our HIFI IT-PARK
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 400,
              marginBottom: "3rem",
              fontSize: {
                xs: "0.875rem", // smaller font size on small screens
                md: "1rem", // default font size on medium and larger screens
              },
              lineHeight: 1.5,
            }}
          >
            "An HRMS is the heartbeat of your company, empowering employees and
            streamlining operations.
            <br />
            Invest in your people to drive growth and success. Your greatest
            asset is your workforce."
          </Typography>
          <Link to="/client_dashboard">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#b8a5fe",
              color: "#fff",
              padding: {
                xs: "0.75rem 1.5rem", // smaller padding on small screens
                md: "1rem 2rem", // default padding on medium and larger screens
              },
              borderRadius: "50px",
              fontFamily: "Poppins",
              fontWeight: 500,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#8c6efa",
              },
            }}
            endIcon={<ArrowForward />}
          >
            Continue
          </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomeForClient;
