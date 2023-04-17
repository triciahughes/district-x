import * as React from "react";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Grid,
  Avatar,
  Typography,
  ButtonGroup,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import Link from "@mui/material/Link";
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
} from "@mui/icons-material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
///////////// IMPORTS //////////////

function Posts({
  user,
  fetchPost,
  id,
  votes,
  posts,
  postUser,
  postUserId,
  postThumbnailData,
  commentsCount,
}) {
  const history = useHistory();
  ///////////// STYLES //////////////
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 700,
    color: theme.palette.text.primary,
  }));

  const deleteButton =
    postUserId === user.id ? (
      <HighlightOffRoundedIcon
        style={{ color: "#D9381E" }}
        onClick={handleDeleteClick}
      />
    ) : null;

  function handleDeleteClick() {
    fetch(`/posts/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        res.json().then(fetchPost());
      }
    });
  }

  const postThumbnail = `data:image/jpeg;base64,${postThumbnailData}`;

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
        res.json().then(fetchPost);
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
        res.json().then(fetchPost);
      }
    });
  }

  function handlePostUsernameClick() {
    history.push(`/profile/${postUserId}`);
  }

  function handlePostClick() {
    history?.push(`/post/${id}`);
  }

  return (
    <>
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
                  onClick={handlePostUsernameClick}
                >
                  {postUser}
                </Link>
              </Typography>
              <Typography fontWeight={100} onClick={handlePostClick}>
                {posts}
              </Typography>
              <Link
                fontWeight={100}
                sx={{ color: "#949391" }}
                href=""
                underline="hover"
                onClick={handlePostClick}
              >
                {`${commentsCount} comments`}
              </Link>
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
                  {deleteButton}
                </ListItem>
              </List>
            </ButtonGroup>
          </Grid>
        </StyledPaper>
      </Box>
    </>
  );
}

export default Posts;
