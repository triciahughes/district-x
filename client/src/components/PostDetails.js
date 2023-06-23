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
import { Container, CssBaseline } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ProfilePosts from "./ProfilePosts";
import ProfileComments from "./ProfileComments";
const drawerWidth = 240;

const PostDetails = ({
  handleLogOutClick,
  user,
  userId,
  userThumbnail,
  fetchPost,
  addCoins,
  subtractCoins,
  fetchUserPosts,
  fetchUserComments,
  totalCoins,
  postSortBool,
}) => {
  ///////////// STYLES //////////////
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 700,
    color: theme.palette.text.primary,
  }));

  const [postDetails, setPostDetails] = useState();
  const [commentSortBool, setCommentSortBool] = useState(false);
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
    addCoins();

    fetch(`/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ votes: newUpvotes }),
    }).then((res) => {
      if (res.ok) {
        res.json().then(fetchPostDetails(), fetchUserPosts(userId));
      }
    });
  }

  function handleDownvoteClick() {
    const newDownvotes = (votes -= 1);
    subtractCoins();
    console.log("downvote clicked");
    // fetchUserPosts(userId);

    fetch(`/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ votes: newDownvotes }),
    }).then((res) => {
      if (res.ok) {
        res.json().then(fetchPostDetails(), fetchUserPosts(userId));
      }
    });
  }

  // function handleCommentSortClick() {
  //   setCommentSortBool((current) => !current);
  //   console.log(commentSortBool);
  // }

  //////////// variables ////////////
  const post = postDetails?.post;
  let votes = postDetails?.votes;
  const postUsername = postDetails?.user.username;
  const comments = postDetails?.comments.reverse();
  const postId = postDetails?.user.id;
  const postThumbnailData = postDetails?.user.thumbnail;
  // const postDistrictId = postDetails?.district.id;
  // console.log(postDistrictId);

  ////////// thumbnail data conversion ///////////
  const data = `data:image/jpeg;base64,${userThumbnail}`;
  const postThumbnail = `data:image/jpeg;base64,${postThumbnailData}`;

  // const commentSort = comments?.map((data) => data.votes).sort((a, b) => b - a);

  // const commentSortArray = postSortBool ? commentSort : comments;

  // console.log(commentSort);

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
        totalCoins={totalCoins}
        addCoins={addCoins}
        subtractCoins={subtractCoins}
        fetchUserPosts={fetchUserPosts}
        fetchUserComments={fetchUserComments}
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
      <ProfilePosts fetchPostDetails={fetchPostDetails} />
      <ProfileComments fetchPostDetails={fetchPostDetails} />
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
          {/* <Grid>
            <Button onClick={handleCommentSortClick}>
              <SortIcon />
            </Button>
          </Grid> */}
        </Box>
      </Container>
      <Typography align="center" fontWeight={100}>
        Comments
      </Typography>
      {comment}
    </>
  );
};

export default PostDetails;
