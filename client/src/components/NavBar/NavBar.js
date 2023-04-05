import * as React from "react";
import { useHistory } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItemAvatar } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";

const drawerWidth = 240;
function NavBar() {
  const history = useHistory();

  function handleLogOutClick() {
    history.push("/signin");
  }
  function handleCreatePostClick() {
    console.log("Clicked");
  }
  function handleUsernameClick() {
    console.log("Clicked");
  }

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
      <List onClick={handleUsernameClick}>
        {[`Username Here`].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <AccountCircleIcon />
                {/* <Avatar alt="Profile Picture" src="" /> */}
              </ListItemAvatar>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List onClick={handleCreatePostClick}>
        {["Create Post"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List onClick={handleLogOutClick}>
        {["Logout"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default NavBar;
