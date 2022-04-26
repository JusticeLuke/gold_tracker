import React from "react";
import LoginForm from "./accounts/LoginForm";
import Navbar from "./navbar/Navbar";
import { Users } from "./Users";

function App() {
  return (
    <div className="App">
      <Navbar />
      <LoginForm />
    </div>
  );
}

export default App;
