import React, { useState } from "react";
import Navbar from "./navbar/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { darkLight } from "../AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from "@mui/material";

function App() {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const darkModeTheme = createTheme(darkLight(mode));
  return (
    <Grid container>
      <Navbar props={mode} />
      <Outlet />
    </Grid>
  );
}

export default App;
