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

const PostDetails = ({ handleLogOutClick, user }) => {
  ///////////// STYLES //////////////
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 700,
    color: theme.palette.text.primary,
  }));

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
  console.log(postDetails);
  const post = postDetails?.post;
  let votes = postDetails?.votes;
  const postUsername = postDetails?.user.username;
  const comments = postDetails?.comments;
  console.log(post, votes, postUsername);

  const comment = comments?.map((data) => {
    return (
      <Comments
        key={data.id}
        id={data.id}
        comment={data.comment}
        username={data.user.username}
      />
    );
  });

  ////////// user profile /////////////

  function handleUsernameClick() {
    console.log("clicked");
  }

  function handleHomeClick() {
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
        <List onClick={handleUsernameClick}>
          {[`${user}`].map((text) => (
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
              <Avatar>L</Avatar>
            </Grid>
            <Grid item xs>
              <Typography fontWeight={600}>
                <Link href="" underline="hover" color="orange">
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
      <CreateComment />
      <Typography align="center" fontWeight={100}>
        Comments
      </Typography>
      {comment}
      {/* <Comments postDetails={postDetails} /> */}
    </>
  );
};

export default PostDetails;
