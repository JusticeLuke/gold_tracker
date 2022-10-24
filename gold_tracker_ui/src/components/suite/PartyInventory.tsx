import React from "react";
import GridWrapper from "../common/gridWrapper/GridWrapper";
import CharacterDataTable from "../common/dataTable/CharacterDataTable";
import CommonButton from "../common/commonButton/CommonButton";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import NewCharacterModal from "../modal/NewCharacterModal";
import UpdatePartyModal from "../modal/UpdatePartyModal";
import { deleteParty } from "../../actions/partyActions/CRUDParty";
import { useNavigate } from "react-router-dom";
import LogCard from "./inventoryComponents/LogCard";
import AddchartIcon from "@mui/icons-material/Addchart";
import { Character, getPartyCharacters } from "../../actions/characterActions/CRUDCharacter";
import { getLog } from "../../actions/logActions/CRLog";
import { useAuth } from "../../actions/userActions/AuthProvider";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import AlertMessage from "../common/alerts/AlertMessage";
import { CircularProgress } from "@mui/material";

const PartyInventory = () => {
  let navigate = useNavigate();
  let auth = useAuth();
  const [characters, setCharacters] = React.useState<any>();
  const [open, setOpen] = React.useState(false);
  const [openPartyWealth, setOpenPartyWealth] = React.useState(false);

  const { data, isLoading, isSuccess, isError, error } = useQuery<Character[], AxiosError>(
    ['getCharacters'], 
    async () => await getPartyCharacters()
  );
  React.useEffect(() => {
    // Runs after the first render() lifecycle
    getPartyCharacters();
    getLog();
    setCharacters(localStorage.getItem("characters"));
  }, []);

  const addCharacterModal = () => {
    setOpen(true);
  };
  const updatePartyModal = () => {
    setOpenPartyWealth(true);
  };

  const getCharacterData = () => {
   if(isError){
    return <AlertMessage error400="Unable to get characters" error={error} isError={isError} ></AlertMessage>
   }else if(isLoading){
    return <CircularProgress></CircularProgress>
   }else if(isSuccess){
    return <CharacterDataTable rows={data}></CharacterDataTable>
   }
  };

  return (
    <GridWrapper item xs={12}>
      <Box sx={{ m: "10px", display: "inline-block" }}>
        <Link
          href=""
          onClick={() => {
            navigate("../partys");
          }}
        >
          Party
        </Link>
        <span> / Characters</span>
      </Box>
      <CommonButton
        size={"small"}
        variant={"contained"}
        title={"Add new character"}
        placement={"bottom-end"}
        onClick={addCharacterModal}
      >
        <AddIcon />
      </CommonButton>
      <CommonButton
        size={"small"}
        variant={"contained"}
        title={"Add wealth"}
        placement={"bottom-end"}
        onClick={updatePartyModal}
      >
        <AddchartIcon />
      </CommonButton>
      <NewCharacterModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <UpdatePartyModal
        open={openPartyWealth}
        onClose={() => {
          setOpenPartyWealth(false);
        }}
      />
      {getCharacterData()}
      <LogCard />

      <CommonButton
        sx={{ mt: 10 }}
        variant={"contained"}
        onClick={() => {
          deleteParty(auth.partyId);
          navigate("../partys");
        }}
      >
        DELETE PARTY
      </CommonButton>
    </GridWrapper>
  );
};
export default PartyInventory;
