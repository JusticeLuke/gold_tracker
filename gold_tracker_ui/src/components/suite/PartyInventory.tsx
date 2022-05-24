import React from "react";
import BasicCard from "../common/basicCard/BasicCard";
import GridWrapper from "../common/gridWrapper/GridWrapper";
import CharacterDataTable from "../common/dataTable/CharacterDataTable";
import CommonButton from "../common/commonButton/CommonButton";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { deleteParty } from "../../actions/partyActions/CRUDParty";
import { useNavigate } from "react-router-dom";

const PartyInventory = () => {
  let navigate = useNavigate();
  const [characters, setCharacters] = React.useState<any>();

  React.useEffect(() => {
    // Runs after the first render() lifecycle
    setCharacters(localStorage.getItem("characters"));
  }, []);

  const getContent = () => {
    let data = [];
    if (characters != null) {
      data = JSON.parse(characters);
    }
    return <CharacterDataTable rows={data} />;
  };

  return (
    <GridWrapper item xs={8} sx={{ margin: "auto" }}>
      <Box sx={{ mt: "5px" }}>
        <Link
          href=""
          onClick={() => {
            navigate("../partys");
          }}
        >
          Party
        </Link>
        <pre> / Characters</pre>
      </Box>
      <BasicCard content={getContent()} />
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
