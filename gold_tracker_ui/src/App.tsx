import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Users } from "./Users";
import { QueryClient, QueryClientProvider } from "react-query";

let queryClient = new QueryClient();
function Stuff() {
  return (
    <div className="App">
      <Users />
    </div>
  );
}
function App() {
  return <Stuff />;
}

export default App;
