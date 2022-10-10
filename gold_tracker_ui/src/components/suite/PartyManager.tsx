import React, { useState } from "react";
import BasicCard from "../common/basicCard/BasicCard";
import SearchBar from "../common/searchBar/SearchBar";
import Box from "@mui/material/Box";
import CommonButton from "../common/commonButton/CommonButton";
import GridWrapper from "../common/gridWrapper/GridWrapper";
import NewPartyModal from "../modal/NewPartyModal";
import PartyDataTable from "../common/dataTable/PartyDataTable";
import { getPartys, Party } from "../../actions/partyActions/CRUDParty";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import AlertMessage from "../common/alerts/AlertMessage";
import { CircularProgress } from "@mui/material";

const partyManagerStyles = {
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
  partyContainer: {
    marginTop: "60rem",
  },
  loading: {
    display: "flex",
    margin: "auto",
  }
};

const PartyManager = () => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const { data, isLoading, isSuccess, isError, error } = useQuery<Party[], AxiosError>(
    ['getPartys'], 
    async () => await getPartys(localStorage.getItem('token'))
  );

  const getSearchHeader = () => {
    const handleChange = (value: any) => {
      setSearchValue(value);
    };
    const addPartyModal = () => {
      setOpen(true);
    };

    return (
      <Box sx={partyManagerStyles.wrapper}>
        <SearchBar
          placeholder={"Search by party name or id"}
          onChange={(event: any) => handleChange(event.target.value)}
          searchBarWidth={"45vw"}
        />
        <Box>
          <CommonButton
            sx={partyManagerStyles.addParty}
            variant="contained"
            onClick={addPartyModal}
            size={"large"}
          >
            Add Party
          </CommonButton>
        </Box>
      </Box>
    );
  };

  const getContent = () => {
    if(isSuccess){
      return <PartyDataTable userPartys={data} search={searchValue} />;
    }else if(isLoading){
      return <CircularProgress color='inherit' sx={partyManagerStyles.loading}/>
    }
    else if(isError){
      return <AlertMessage isError={isError} error= {error} error400= {"Error getting user partys"}></AlertMessage>
    }
  };
  return (
    <GridWrapper item xs={8} sx={partyManagerStyles.partyContainer}>
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
