import { createTheme, PaletteMode } from "@mui/material";
import { teal, grey, amber } from "@mui/material/colors";
import { dark } from "@mui/material/styles/createPalette";
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export const manageThemes = (mode?: PaletteMode) => {
  if(mode === undefined){
    mode = "dark";
  }
  const darkLight = (mode: PaletteMode) => createTheme({
    palette: {
      mode ,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: amber,
            divider: amber[200],
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            // palette values for dark mode
            primary: teal,
            divider: teal[900],
            background: {
              default: grey[900],
              paper: grey[900],
            },
            text: {
              primary: "#fff",
              secondary: grey[500],
            },
          }),
    },
  });
  
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "3.2rem",
        fontWeight: 600,
        color: "#fff",
        letterSpacing: "0.5px",
        textTransform: "capitalize",
      },
      h2: {
        fontSize: "2.7rem",
        fontWeight: 600,
        color: "#fff",
        letterSpacing: "0.5px",
        textTransform: "capitalize",
      },
      h3: {
        fontSize: "2.2rem",
        fontWeight: 600,
        color: "#fff",
        letterSpacing: "0.5px",
        textTransform: "capitalize",
      },
      h4: {
        fontSize: "1.7rem",
        fontWeight: 600,
        color: "#fff",
        letterSpacing: "0.5px",
        textTransform: "capitalize",
      },
      h5: {
        fontSize: "1.3rem",
        fontWeight: 600,
        color: "#fff",
        letterSpacing: "0.5px",
        textTransform: "capitalize",
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 600,
        color: "#fff",
        letterSpacing: "0.5px",
        textTransform: "capitalize",
      },
    },
  }, darkLight(mode));

  return theme;
}

