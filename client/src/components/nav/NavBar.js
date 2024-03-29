import React from "react";
import { useNavigate } from "react-router-dom";
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
// import ArrowRightIcon from "@material-ui/icons/ArrowRight";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
///////////// IMPORTS //////////////

const drawerWidth = 240;

function NavBar({
  handleLogout,
  userData,
  handleCreatePostClick,
  districts,
  totalCoins,
}) {
  const navigate = useNavigate();

  const districtList = districts.map((district) => {
    return (
      <ListItem
        key={district.id}
        disablePadding
        id={district.id}
        onClick={handleDistrictClick}
      >
        <ListItemButton>
          <ListItemIcon>{/* <ArrowRightIcon /> */}</ListItemIcon>
          <ListItemText primary={district.name} />
        </ListItemButton>
      </ListItem>
    );
  });

  function handleLogOutClick() {
    handleLogout();
  }

  function handleUsernameClick() {
    navigate(`/profile/${userData.id}`);
  }

  function handleAllDistrictsClick() {
    navigate("/districts/all");
  }

  function handleDistrictClick(e) {
    // Get the ID of the clicked district by accessing the "id" property of the "currentTarget" element
    const districtId = e.currentTarget.id;
    // Navigate to the district page using the district ID
    navigate(`/district/${districtId}`);
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
                <Avatar alt="Profile Picture" src={data} />
              </ListItemAvatar>
              <ListItemText primary={text} />
            </ListItemButton>
            <ListItemText primary={`${totalCoins} coins`} />
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
      <Divider />
      <List onClick={handleAllDistrictsClick}>
        {["All Districts"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{/* <MoreHorizIcon /> */}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>{districtList}</List>
    </Drawer>
  );
}

export default NavBar;
