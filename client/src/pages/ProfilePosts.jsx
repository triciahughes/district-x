import React, { useEffect, useState } from "react";
import Posts from "../components/Posts";
import Home from "../components/Home";
// import React from "react";
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
// import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useParams, Route, Routes } from "react-router-dom";

const drawerWidth = 240;
const ProfilePosts = ({
  user,
  sessionUser,
  sessionUserId,
  handleLogout,
  userThumbnail,
  totalCoins,
  addCoins,
  subtractCoins,
  fetchUserPosts,
  fetchUserComments,
  fetchPostDetails,
  fetchProfilePost,
  profilePost,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProfilePost(id);
  }, []);

  const dynamicPost = profilePost?.map((post) => {
    return (
      <Posts
        key={post.id}
        id={post.id}
        votes={post.votes}
        posts={post.post}
        postUser={post.user.username}
        postUserId={post.user.id}
        postThumbnailData={post.user.thumbnail}
        commentsCount={post.comments.length}
        postDistrict={post.district?.name}
        postDistrictId={post.district?.id}
        addCoins={addCoins}
        subtractCoins={subtractCoins}
        user={user}
        fetchUserPosts={fetchUserPosts}
        fetchProfilePost={fetchProfilePost}
        fetchUserComments={fetchUserComments}
        fetchPostDetails={fetchPostDetails}
        sessionUserId={sessionUserId}
      />
    );
  });

  const data = `data:image/jpeg;base64,${userThumbnail}`;

  ///////// Comment List By User //////
  function handleCommentsByUserClick() {
    navigate(`/profile/${id}/comments`);
    console.log("Comment Clicked");
  }

  function handleHomeClick() {
    navigate("/home");
  }

  return (
    <>
      <Routes>
        <Route
          path="/home"
          elements={<Home fetchProfilePost={fetchProfilePost} />}
        />{" "}
      </Routes>
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
          {[`${sessionUser}`].map((text) => (
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

        <List>
          {["Posts"].map((text) => (
            <ListItem style={{ color: "#949391" }} key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{/* <ArrowForwardIcon /> */}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List onClick={handleCommentsByUserClick}>
          {["Comments"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{/* <ArrowForwardIcon /> */}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {dynamicPost}
    </>
  );
};

export default ProfilePosts;
