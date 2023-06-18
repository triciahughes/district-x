import React, { useEffect, useState } from "react";
import Posts from "./Posts";
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
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory, useParams } from "react-router-dom";

const drawerWidth = 240;
const ProfilePosts = ({ user, handleLogout, userThumbnail }) => {
  const [profilePost, setProfilePost] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    fetchProfilePost();
  }, []);

  console.log("hello from profile post the id is: ", id);

  function fetchProfilePost() {
    fetch(`/profileposts/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((profilePostData) => {
          console.log(profilePostData);
          setProfilePost(profilePostData);
          console.log("hello from profile post");
        });
      }
    });
  }

  const dynamicPost = profilePost?.map((post) => {
    return (
      <Posts
        key={post.id}
        id={post.id}
        votes={post.votes}
        posts={post.post}
        postUser={post.user.username}
        // postData={posts}
        postUserId={post.user.id}
        // userData={userData}
        postThumbnailData={post.user.thumbnail}
        commentsCount={post.comments.length}
        postDistrict={post.district?.name}
        postDistrictId={post.district?.id}
      />
    );
  });

  const data = `data:image/jpeg;base64,${userThumbnail}`;

  ///////// Post List By User //////
  function handlePostsByUserClick() {
    // history.push(`/profile/${id}/posts`);
    console.log("Post Clicked");
  }
  ///////// Comment List By User //////
  function handleCommentsByUserClick() {
    history.push(`/profile/comments/${id}`);
    console.log("Comment Clicked");
  }

  function handleHomeClick() {
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
        <List onClick={handlePostsByUserClick}>
          {["Posts"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List onClick={handleCommentsByUserClick}>
          {["Comments"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ArrowForwardIcon />
                </ListItemIcon>
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
