import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Users } from "./Users";
import { QueryClient, QueryClientProvider } from "react-query";

let queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <Users />
    </div>
  );
}

export default App;
