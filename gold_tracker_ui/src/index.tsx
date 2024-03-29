import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./components/App";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import PartyManager from "./components/suite/PartyManager";
import PartyInventory from "./components/suite/PartyInventory";
import Welcome from "./components/suite/Welcome";
import NoMatch from "./components/common/NoMatch";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth, AuthProvider } from "./actions/userActions/AuthProvider";
import { ThemeChangerProvider } from "./ThemeChangerProvider";
import { CssBaseline } from "@mui/material";

render(<Index />, document.getElementById("root"));

function Index() {
  return (
    <React.Fragment>
      <ThemeChangerProvider>
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
      </ThemeChangerProvider>
    </React.Fragment>
  );
}
