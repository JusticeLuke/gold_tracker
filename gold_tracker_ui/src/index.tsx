import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import MonsterGen from "./components/suite/MonsterGen";
import PartyManager from "./components/suite/PartyManager";
import NoMatch from "./components/common/NoMatch";
import { ThemeProvider } from "@mui/material/styles";
import { AppTheme } from "./AppTheme";

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <ThemeProvider theme={AppTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="partys" element={<PartyManager />}></Route>
          <Route path="monsterGen" element={<MonsterGen />}></Route>
          {/* <Route path="logout" element={}></Route> */}
          <Route path="register" element={<Register />}></Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
