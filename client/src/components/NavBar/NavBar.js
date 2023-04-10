import React from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
///////////// IMPORTS //////////////

const drawerWidth = 240;

function NavBar({ handleLogout, userData, handleCreatePostClick }) {
  const history = useHistory();

  function handleLogOutClick() {
    handleLogout();
  }

  function handleUsernameClick() {
    history.push(`/profile/${userData.id}`);
  }

  ////////////// Thumbnail Converter //////////////
  const data = `data:image/jpeg;base64,${userData.thumbnail}`;

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
        {[`${userData.username}`].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                {/* <Avatar alt="Remy Sharp" src="" /> */}
                <Avatar alt="Profile Picture" src={data} />
                {/* {imageConverter} */}
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
