import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import AddchartIcon from "@mui/icons-material/Addchart";
import Tooltip from "@mui/material/Tooltip";
import CommonButton from "../../common/commonButton/CommonButton";
import { deleteCharacter } from "../../../actions/characterActions/CRUDCharacter";
export default function CharacterDataTable(row: any) {
  let character = row.row;

  const handleWealth = () => {};
  const handleTribute = () => {};

  if (character !== undefined) {
    return (
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem>
              <ListItemText
                sx={{ textAlign: "center" }}
                primary={"Wealth of " + character.name}
              />
            </ListItem>
            <ListItem>
              <Tooltip title={"gold"} placement={"right-start"}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#ffc400" }}>G</Avatar>
                </ListItemAvatar>
              </Tooltip>
              <ListItemText
                sx={{ textAlign: "center" }}
                primary={character.personal_gold}
              />
            </ListItem>
            <ListItem>
              <Tooltip title={"silver"} placement={"right-start"}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#648dae" }}>S</Avatar>
                </ListItemAvatar>
              </Tooltip>
              <ListItemText
                sx={{ textAlign: "center" }}
                primary={character.personal_silver}
              />
            </ListItem>
            <ListItem>
              <Tooltip title={"copper"} placement={"right-start"}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#852508" }}>C</Avatar>
                </ListItemAvatar>
              </Tooltip>
              <ListItemText
                sx={{ textAlign: "center" }}
                primary={character.personal_copper}
              />
            </ListItem>
          </List>
        </nav>
        <Box sx={{ textAlign: "center" }}>
          <CommonButton
            variant={"contained"}
            color={"primary"}
            title={"Manage personal wealth"}
            placement={"bottom-start"}
            onClick={() => {
              handleWealth();
            }}
          >
            <AddchartIcon />
          </CommonButton>
          <CommonButton
            sx={{ mx: "10px", my: "5px" }}
            variant={"contained"}
            color={"primary"}
            title={"Contribute to party's shared gold"}
            placement={"bottom-start"}
            onClick={() => {}}
          >
            <GroupAddIcon />
          </CommonButton>
          <CommonButton
            variant={"contained"}
            color={"primary"}
            title={"Delete character"}
            placement={"bottom-start"}
            onClick={() => {
              deleteCharacter(character.id);
            }}
          >
            <DeleteIcon />
          </CommonButton>
        </Box>
      </Box>
    );
  } else {
    return <Box sx={{ width: "360px" }}>Please select a character</Box>;
  }
}
