import React from "react";
import Grid from "@mui/material/Grid";

const GridWrapper = ({ children }: any) => {
  const gridWrapperStyles = {
    margin: "auto",
  };
  return (
    <Grid item xs={8} sx={gridWrapperStyles}>
      {children}
    </Grid>
  );
};

export default GridWrapper;
