import React from "react";
import { Box, Grid, Link, Typography } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  let navigate = useNavigate();
  const welcomeStlyes = {
    goldTrackerHeader: {
      color: "gold",
      marginBottom: "1rem",
    },
    headerContainer: {
      margin: "auto",
      marginTop: "5rem",
      textAlign: "center",
      maxWidth: "60%",
    },
    welcomeBody: {
      textAlign: "left",
    },
  };
  return (
    <Grid container>
      <Navbar />
      <Box sx={welcomeStlyes.headerContainer}>
        <Typography variant="h6">Welcome to the</Typography>
        <Typography variant="h1" sx={welcomeStlyes.goldTrackerHeader}>
          GOLD_TRACKER
        </Typography>
        <Box sx={welcomeStlyes.welcomeBody}>
          GOLD_TRACKER is a tool for Game Masters to manage party and character
          gold across multiple games. Track a party's gold, character wealth,
          and maintain a log of gold changes to ensure the integrity of your
          games. <br />
          <br />
          To get started{" "}
          <Link
            onClick={() => {
              navigate("../register");
            }}
            href=""
          >
            CREATE AN ACCOUNT
          </Link>{" "}
          or{" "}
          <Link
            onClick={() => {
              navigate("../login");
            }}
            href=""
          >
            LOGIN
          </Link>
          <br />
          <br />
        </Box>
      </Box>
    </Grid>
  );
};

export default Welcome;
