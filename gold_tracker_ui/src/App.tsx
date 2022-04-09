import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { Users } from "./components/Users";
import { QueryClient, QueryClientProvider } from "react-query";

let queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <Users />
      <LoginForm />
    </div>
  );
}

export default App;
