import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const NoMatch = ({ placeholder, onChange, searchBarWidth }: any) => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        m: "10vh auto",
      }}
    >
      <Box>
        <Typography
          variant="h1"
          component="div"
          sx={{ color: "black", display: "flex", justifyContent: "center" }}
        >
          404 ERROR
        </Typography>
        <Typography variant="body1" gutterBottom>
          You have wondered to far adventurer. Please return to the main road.
        </Typography>
      </Box>
    </Grid>
  );
};

export default NoMatch;
