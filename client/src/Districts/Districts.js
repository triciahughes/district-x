import React from "react";
import CreatePost from "../components/CreatePost";
import { useHistory, useParams } from "react-router-dom";
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
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
///////////// IMPORTS //////////////

const drawerWidth = 240;
const Districts = ({
  user,
  handleLogout,
  handleCreatePostClick,
  showCreatePost,
  setShowCreatePost,
  post,
}) => {
  const history = useHistory();
  const { id } = useParams();

  console.log(id);

  function handleHomeClick() {
    history.push("/home");
  }

  function handleLogOutClick() {
    handleLogout();
  }

  const data = `data:image/jpeg;base64,${user.thumbnail}`;

  const filteredDistricts = post.filter(
    (district) => district.district?.id === parseInt(id)
  );

  console.log(post);

  console.log(filteredDistricts);

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
        {[`${user.username}`].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={data} />
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
      <List onClick={handleHomeClick}>
        {["Home"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <HomeIcon />
              </ListItemAvatar>
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
      <Divider />
    </Drawer>
  );
};

export default Districts;
