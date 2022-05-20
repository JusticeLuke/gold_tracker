import React, { useState } from "react";
import BasicCard from "../common/basicCard/BasicCard";
import SearchBar from "../common/searchBar/SearchBar";
import Box from "@mui/material/Box";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import CommonButton from "../common/commonButton/CommonButton";
import GridWrapper from "../common/gridWrapper/GridWrapper";
import NewPartyModal from "../modal/NewPartyModal";
import DataTable from "../common/dataTable/DataTable";
import { useAuth } from "../../actions/userActions/AuthProvider";

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

  let auth = useAuth();
  const getContent = () => {
    let partys = localStorage.getItem("partys");
    let data = "";
    if (partys != null) {
      data = JSON.parse(partys);
    }

    return <DataTable rows={data} />;
  };
  return (
    <GridWrapper item xs={8} sx={{ margin: "auto" }}>
      <BasicCard header={getSearchHeader()} content={getContent()} />
      <NewPartyModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSuccessfulSubmit={() => {
          setOpen(false);
        }}
      />
    </GridWrapper>
  );
};

export default PartyManager;
