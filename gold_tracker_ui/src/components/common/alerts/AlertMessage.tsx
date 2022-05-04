import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
export const AlertMessage = ({ severity, message }: any) => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Alert severity={severity} sx={{ mt: "10vh" }}>
        {message}
      </Alert>
    </Grid>
  );
};
