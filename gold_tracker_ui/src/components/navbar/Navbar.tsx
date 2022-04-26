import React, { Component } from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { mainNavbarItems } from "./constants/navbarItems";
import { useParams, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {mainNavbarItems.map((item, index) => (
          <ListItem
            button
            key={item.id}
            onClick={() => {
              navigate(item.route);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Navbar;
