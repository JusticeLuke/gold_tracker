import React from "react";
import LoginForm from "./accounts/Login";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";

function App() {
  return (
    <Grid container>
      <Navbar />
      <Outlet />
    </Grid>
  );
}

export default App;
