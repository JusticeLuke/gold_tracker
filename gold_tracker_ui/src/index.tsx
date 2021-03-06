import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import MonsterGen from "./components/suite/MonsterGen";
import PartyManager from "./components/suite/PartyManager";
import PartyInventory from "./components/suite/PartyInventory";
import NoMatch from "./components/common/NoMatch";
import { ThemeProvider } from "@mui/material/styles";
import { AppTheme } from "./AppTheme";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth, AuthProvider } from "./actions/userActions/AuthProvider";

ReactDOM.render(
  <ThemeProvider theme={AppTheme}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<Login />}></Route>
            <Route
              path="partys"
              element={
                <RequireAuth>
                  <PartyManager />
                </RequireAuth>
              }
            ></Route>
            <Route path="partys/inventory" element={<PartyInventory />}></Route>
            <Route path="monsterGen" element={<MonsterGen />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
