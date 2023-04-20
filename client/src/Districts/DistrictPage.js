import React from "react";
import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";
import { useHistory, useParams } from "react-router-dom";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
  Grid,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
///////////// IMPORTS //////////////

const drawerWidth = 240;
const DistrictPage = ({
  user,
  handleLogout,
  handleCreatePostClick,
  showCreatePost,
  setShowCreatePost,
  post,
  filterButton,
  fetchPost,
  districtDetails,
}) => {
  const history = useHistory();
  const { id } = useParams();

  ///////////// STYLES //////////////
  const theme = createTheme({
    palette: {
      primary: {
        main: "#03a9f4",
      },
      secondary: {
        main: "#ff9100",
      },
    },
  });

  const filteredDistrict = districtDetails.filter((district) => {
    if (district.id === parseInt(id)) {
      return district.name;
    }
  });

  const districtName = filteredDistrict.map((district) => {
    return `#${district.name.toLowerCase()}`;
  });

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

  const districtPosts = filteredDistricts.map((post) => {
    return (
      <Posts
        user={user}
        fetchPost={fetchPost}
        key={post.id}
        id={post.id}
        votes={post.votes}
        posts={post.post}
        postUser={post.user.username}
        postData={post}
        postUserId={post.user.id}
        //   userData={userData}
        postThumbnailData={post.user.thumbnail}
        commentsCount={post.comments.length}
        districtName={districtName}
      />
    );
  });

  return (
    <>
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
      <Container
        component="main"
        sx={{
          marginTop: 8,
          marginBottom: 0,
          marginLeft: 55,
        }}
      >
        <h1>Welcome to the {districtName} district</h1>
      </Container>
      {showCreatePost ? (
        <CreatePost
          user={user}
          setShowCreatePost={setShowCreatePost}
          districtId={parseInt(id)}
          fetchPost={fetchPost}
        />
      ) : null}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 0,
              marginLeft: 65,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid>{filterButton}</Grid>
          </Box>
        </Container>
      </ThemeProvider>
      {districtPosts}
    </>
  );
};

export default DistrictPage;
