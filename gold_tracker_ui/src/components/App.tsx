import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../actions/userActions/AuthProvider";

function App() {
  let auth = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (!auth.username) {
      navigate("login");
    } else {
      navigate("partys");
    }
  }, []);
  return (
    <Grid container>
      <Navbar />
      <Outlet />
    </Grid>
  );
}

export default App;
