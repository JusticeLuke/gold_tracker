import React, { useState, useEffect } from "react";
import BasicCard from "../common/basicCard/BasicCard";
import SearchBar from "../common/searchBar/SearchBar";
import Box from "@mui/material/Box";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import CommonButton from "../common/commonButton/CommonButton";
import GridWrapper from "../common/gridWrapper/GridWrapper";
import NewPartyModal from "../modal/NewPartyModal";
import PartyDataTable from "../common/dataTable/PartyDataTable";
import { getPartys } from "../../actions/partyActions/CRUDParty";

const PartyManager = () => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    // Runs after the first render() lifecycle
    getPartys();
  });
  const getSearchHeader = () => {
    const handleChange = (value: any) => {
      setSearchValue(value);
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
          placeholder={"Search by party name or id"}
          onChange={(event: any) => handleChange(event.target.value)}
          searchBarWidth={"45vw"}
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

  const getContent = () => {
    let partys = localStorage.getItem("partys");
    let data = "";
    if (partys != null) {
      data = JSON.parse(partys);
    }

    return <PartyDataTable rows={data} search={searchValue} />;
  };
  return (
    <GridWrapper item xs={8} sx={{ margin: "auto" }}>
      <BasicCard
        header={getSearchHeader()}
        content={getContent()}
        sx={{ mt: "5px" }}
      />
      <NewPartyModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </GridWrapper>
  );
};

export default PartyManager;
