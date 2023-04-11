import Comments from "./Comments";
import CreateComment from "./CreateComment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  Grid,
  Box,
  Paper,
  styled,
  Avatar,
  Typography,
  Link,
  ButtonGroup,
} from "@mui/material";
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
const drawerWidth = 240;

const PostDetails = ({
  handleLogOutClick,
  user,
  userId,
  userThumbnail,
  fetchPost,
}) => {
  ///////////// STYLES //////////////
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 700,
    color: theme.palette.text.primary,
  }));

  // console.log(userId);

  const [postDetails, setPostDetails] = useState();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  function fetchPostDetails() {
    fetch(`/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPostDetails(data);
      });
  }

  //////////// upvotes && downvotes ////////////

  function handleUpvoteClick() {
    const newUpvotes = (votes += 1);

    fetch(`/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ votes: newUpvotes }),
    }).then((res) => {
      if (res.ok) {
        res.json().then(fetchPostDetails());
      }
    });
  }

  function handleDownvoteClick() {
    const newDownvotes = (votes -= 1);

    fetch(`/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ votes: newDownvotes }),
    }).then((res) => {
      if (res.ok) {
        res.json().then(fetchPostDetails());
      }
    });
  }

  //////////// variables ////////////
  const post = postDetails?.post;
  let votes = postDetails?.votes;
  const postUsername = postDetails?.user.username;
  const comments = postDetails?.comments;
  const postId = postDetails?.user.id;
  const postThumbnailData = postDetails?.user.thumbnail;
  // const commentThumbnailData = comments?.user.thumbnail;

  // console.log(data);

  const data = `data:image/jpeg;base64,${userThumbnail}`;

  const postThumbnail = `data:image/jpeg;base64,${postThumbnailData}`;

  const comment = comments?.map((data) => {
    return (
      <Comments
        key={data.id}
        id={data.id}
        comment={data.comment}
        username={data.user}
        votes={data.votes}
        fetchPostDetails={fetchPostDetails}
        commentUserId={data.user.id}
        commentThumbnailData={data.user.thumbnail}
        userId={userId}
      />
    );
  });

  ////////// user (self) profile /////////////
  function handleUsernameClick() {
    history.push(`/profile/${userId}`);
  }

  ////////// profile /////////////
  function handleProfileClick() {
    history.push(`/profile/${postId}`);
  }

  ////////// Home ///////////////
  function handleHomeClick() {
    fetchPost();
    history.push("/home");
  }

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

        <List onClick={handleUsernameClick}>
          {[`${user}`].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  {/* <AccountCircleIcon /> */}
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
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          px: 3,
          backgroundColor: "white",
        }}
      >
        <StyledPaper
          sx={{
            my: 2,
            mx: "auto",
            p: 2,
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Profile Picture" src={postThumbnail} />
            </Grid>
            <Grid item xs>
              <Typography fontWeight={600}>
                <Link
                  href=""
                  underline="hover"
                  color="orange"
                  onClick={handleProfileClick}
                >
                  {postUsername}
                </Link>
              </Typography>
              <Typography fontWeight={100}>{post}</Typography>
            </Grid>
            <ButtonGroup>
              <List>
                <ListItem>
                  <ListItemButton onClick={handleUpvoteClick}>
                    <ArrowUpwardIcon
                      sx={{ color: "#D0DB61" }}
                    ></ArrowUpwardIcon>
                  </ListItemButton>
                  <p style={{ color: "#03a9f4" }}>{votes}</p>
                  <ListItemButton onClick={handleDownvoteClick}>
                    <ArrowDownwardIcon
                      sx={{ color: "#D9381E" }}
                    ></ArrowDownwardIcon>
                  </ListItemButton>
                </ListItem>
              </List>
            </ButtonGroup>
          </Grid>
        </StyledPaper>
      </Box>
      <CreateComment
        id={id}
        userId={userId}
        fetchPostDetails={fetchPostDetails}
      />
      <Typography align="center" fontWeight={100}>
        Comments
      </Typography>
      {comment}
      {/* <Comments postDetails={postDetails} /> */}
    </>
  );
};

export default PostDetails;
