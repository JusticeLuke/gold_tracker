import React from "react";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { Users } from "./components/Users";

function App() {
  return (
    <div className="App">
      <Users />
      <LoginForm />
    </div>
  );
}

export default App;
