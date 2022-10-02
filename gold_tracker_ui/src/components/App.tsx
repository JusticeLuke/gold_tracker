import React from "react";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Grid container>
        <Navbar />
        <Outlet />
      </Grid>
    </QueryClientProvider>
  );
}

export default App;
