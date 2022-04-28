import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

const SearchBar = ({ placeholder, onChange, searchBarWidth }: any) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <SearchIcon sx={{ margin: "10px" }} />
      <Input
        placeholder={placeholder}
        onChange={onChange}
        sx={{
          width: searchBarWidth,

          fontSize: "1.1rem",
        }}
        disableUnderline
      />
    </Box>
  );
};

export default SearchBar;
