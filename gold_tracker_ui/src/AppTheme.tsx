import { createTheme } from "@mui/material/styles";

export const AppTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          fontWeight: 600,
          textTransform: "capitalize",
          borderRadius: 2.5,
          "&.MuiButton-contained": {
            "&:hover": {},
          },
          "&.MuiButton-outlined": {
            color: "#fff",
            borderColor: "#fff",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#007766",
    },
    secondary: {
      main: "#77004D",
    },
  },
  typography: {
    h1: {
      fontSize: "1.6rem",
      fontWeight: 600,
      color: "#fff",
      letterSpacing: "0.5px",
      textTransform: "capitalize",
    },
  },
});
