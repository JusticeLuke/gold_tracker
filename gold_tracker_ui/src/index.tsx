import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import PartyManager from "./components/suite/PartyManager";
import PartyInventory from "./components/suite/PartyInventory";
import Welcome from "./components/suite/Welcome";
import NoMatch from "./components/common/NoMatch";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { theme, darkLight } from "./AppTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth, AuthProvider } from "./actions/userActions/AuthProvider";
import { CssBaseline } from "@mui/material";

const darkModeTheme = createTheme(darkLight("dark"));

ReactDOM.render(
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <ThemeProvider theme={darkModeTheme}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Welcome />}></Route>
              <Route path="/*" element={<App />}>
                <Route path="login" element={<Login />}></Route>
                <Route path="register" element={<Register />}></Route>
                <Route
                  path="partys"
                  element={
                    <RequireAuth>
                      <PartyManager />
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path="partys/inventory"
                  element={
                    <RequireAuth>
                      <PartyInventory />
                    </RequireAuth>
                  }
                ></Route>
                <Route path="*" element={<NoMatch />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById("root")
);
