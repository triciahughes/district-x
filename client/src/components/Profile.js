import React, { useEffect } from "react";
import {
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory, useParams } from "react-router-dom";
import { ViewAccount } from "../unreal/unrealFunctionLibrary";
const drawerWidth = 240;
const Profile = ({ user, handleLogout, fetchPost, userThumbnail }) => {
  const history = useHistory();
  const { id } = useParams();

  const data = `data:image/jpeg;base64,${userThumbnail}`;

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  function fetchUserDetails() {
    fetch(`/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        ViewAccount({
          skinColor: data.skinColor,
          clothing: data.clothingData,
          hairStyle: data.hairStyle,
          hairColor: data.hairColor,
          eyeStyle: data.eyeStyle,
          backdropHue: data.backdrop,
          thumbnailBase64: "",
        });
      });
  }

  ////////// Home ///////////////
  function handleHomeClick() {
    fetchPost();
    history.push("/home");
  }

  return (
    <>
      {" "}
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

        <List>
          {[`${user}`].map((text) => (
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
        <List onClick={handleHomeClick}>
          {["Home"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <HomeIcon />
                  {/* <Avatar alt="Profile Picture" src="" /> */}
                </ListItemAvatar>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List onClick={handleLogout}>
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
    </>
  );
};

export default Profile;
