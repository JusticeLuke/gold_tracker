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
    if (!localStorage.getItem("token")) {
      navigate("login");
    } else {
      auth.signin("", true);
      navigate("partys");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid container>
      <Navbar />
      <Outlet />
    </Grid>
  );
}

export default App;
