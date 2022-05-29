import React from "react";
import GridWrapper from "../common/gridWrapper/GridWrapper";
import CharacterDataTable from "../common/dataTable/CharacterDataTable";
import CommonButton from "../common/commonButton/CommonButton";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import NewCharacterModal from "../modal/NewCharacterModal";
import { deleteParty } from "../../actions/partyActions/CRUDParty";
import { useNavigate } from "react-router-dom";
import LogCard from "./inventoryComponents/LogCard";
import GraphsCard from "./inventoryComponents/GraphsCard";
import Grid from "@mui/material/Grid";

const PartyInventory = () => {
  let navigate = useNavigate();
  const [characters, setCharacters] = React.useState<any>();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // Runs after the first render() lifecycle
    setCharacters(localStorage.getItem("characters"));
  }, []);

  const addCharacterModal = () => {
    setOpen(true);
  };

  const getData = () => {
    let characterData = [];
    if (characters != null) {
      characterData = JSON.parse(characters);
    }
    return characterData;
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
        color={"primary"}
        title={"Add new character"}
        placement={"right-end"}
        onClick={addCharacterModal}
      >
        <AddIcon />
      </CommonButton>
      <NewCharacterModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />

      <CharacterDataTable rows={getData()} />
      <Grid container sx={{ mt: "1%" }}>
        <LogCard />

        <GraphsCard />
      </Grid>
      <CommonButton
        sx={{ mt: 10 }}
        variant={"contained"}
        color={"primary"}
        onClick={() => {
          deleteParty();
        }}
      >
        DELETE PARTY
      </CommonButton>
    </GridWrapper>
  );
};
export default PartyInventory;
