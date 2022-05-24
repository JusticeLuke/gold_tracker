import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tooltip from "@mui/material/Tooltip";

export default function CharacterDataTable(row: any) {
  let character = row.row;
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
            <ListItem
              secondaryAction={
                <Tooltip
                  title="Add gold to personal wealth"
                  placement="right-end"
                >
                  <IconButton edge="end" aria-label="add">
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#ffc400" }}>G</Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ textAlign: "center" }}
                primary={character.personal_gold}
              />
            </ListItem>
            <ListItem
              secondaryAction={
                <Tooltip
                  title="Add silver to personal wealth"
                  placement="right-end"
                >
                  <IconButton edge="end" aria-label="add">
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#648dae" }}>S</Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ textAlign: "center" }}
                primary={character.personal_silver}
              />
            </ListItem>
            <ListItem
              secondaryAction={
                <Tooltip
                  title="Add copper to personal wealth"
                  placement="right-end"
                >
                  <IconButton edge="end" aria-label="add">
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#852508" }}>C</Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ textAlign: "center" }}
                primary={character.personal_copper}
              />
            </ListItem>
          </List>
        </nav>
      </Box>
    );
  } else {
    return <div>Please select a character</div>;
  }
}
