import React, { useState } from "react";
import BasicCard from "../common/basicCard/BasicCard";
import SearchBar from "../common/searchBar/SearchBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import CommonButton from "../common/commonButton/CommonButton";
import GridWrapper from "../common/gridWrapper/GridWrapper";
import NewPartyModal from "../modal/NewPartyModal";

const PartyManager = () => {
  const [open, setOpen] = useState(false);
  const getSearchHeader = () => {
    const handleChange = (value: any) => {
      console.log(value);
    };
    const addPartyModal = () => {
      setOpen(true);
    };

    const searchHeaderStyles = {
      wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(0,0,0,.1)",
        p: "8px",
      },
      addParty: {
        fontSize: ".85rem",
      },
    };

    return (
      <Box sx={searchHeaderStyles.wrapper}>
        <SearchBar
          placeholder="Search by party name or id"
          onChange={(event: any) => handleChange(event.target.value)}
          searchBarWidth={"500px"}
        />
        <Box>
          <CommonButton
            sx={searchHeaderStyles.addParty}
            variant="contained"
            onClick={addPartyModal}
            size={"large"}
          >
            Add Party
          </CommonButton>
          <IconButton>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };
  const addNewParty = (data: any) => {
    console.log(data);
  };
  const getContent = () => (
    <Typography
      align="center"
      sx={{
        margin: "40px 16px",
        color: "rgba(0, 0, 0, 0.6)",
        fontSize: "1.3rem",
      }}
    >
      {" "}
      No partys for this user
    </Typography>
  );
  return (
    <GridWrapper item xs={8} sx={{ margin: "auto" }}>
      <BasicCard header={getSearchHeader()} content={getContent()} />
      <NewPartyModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        addNewParty={addNewParty}
      />
    </GridWrapper>
  );
};

export default PartyManager;
