import React, { useEffect, useState } from "react";
import Comments from "./Comments";
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
import { useNavigate, useParams } from "react-router-dom";

const drawerWidth = 240;

const ProfileComments = ({
  sessionUser,
  handleLogout,
  userThumbnail,
  totalCoins,
  addCoins,
  subtractCoins,
  user,
  fetchUserPosts,
  fetchUserComments,
  fetchPostDetails,
}) => {
  const [profileComments, setProfileComments] = useState([]);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProfileComments();
  }, []);

  function fetchProfileComments() {
    fetch(`/profilecomments/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((profileCommentData) => {
          console.log(profileCommentData);
          setProfileComments(profileCommentData);
          console.log("hello from profile post");
        });
      }
    });
  }

  const dynamicComment = profileComments?.map((comment) => {
    return (
      <Comments
        userId={user.id}
        key={comment.id}
        id={comment.id}
        comment={comment.comment}
        username={comment.user}
        votes={comment.votes}
        commentUserId={comment.user.id}
        commentThumbnailData={comment.user.thumbnail}
        addCoins={addCoins}
        subtractCoins={subtractCoins}
        fetchUserPosts={fetchUserPosts}
        fetchUserComments={fetchUserComments}
        fetchProfileComments={fetchProfileComments}
        fetchPostDetails={fetchPostDetails}
      />
    );
  });

  const data = `data:image/jpeg;base64,${userThumbnail}`;

  ///////// Post List By User //////
  function handlePostsByUserClick() {
    history.push(`/profile/${id}/posts`);
    console.log("Post Clicked");
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
        <List style={{ color: "#949391" }}>
          {["Comments"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{/* <ArrowForwardIcon /> */}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List onClick={handlePostsByUserClick}>
          {["Posts"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{/* <ArrowForwardIcon /> */}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {dynamicComment}
    </>
  );
};

export default ProfileComments;
