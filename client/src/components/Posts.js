import * as React from "react";
import { useState } from "react";
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
///////////// IMPORTS //////////////

function Posts({ user, fetchPost, id, upvotes, downvotes, posts, postUser }) {
  // const [upvotes, setUpvotes] = useState(0);
  ///////////// STYLES //////////////

  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 700,
    color: theme.palette.text.primary,
  }));

  function handleUpvoteClick() {
    const newUpvotes = (upvotes += 1);

    fetch(`/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ upvotes: newUpvotes }),
    }).then((res) => {
      if (res.ok) {
        res.json().then(fetchPost());
      }
    });
  }

  function handleDownvoteClick() {
    const newDownvotes = (downvotes += 1);

    fetch(`/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ downvotes: newDownvotes }),
    }).then((res) => {
      if (res.ok) {
        res.json().then(fetchPost());
      }
    });
  }

  function handlePostClick() {
    console.log("Clicked");
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
              <Avatar>L</Avatar>
            </Grid>
            <Grid item xs onClick={handlePostClick}>
              <Typography fontWeight={600}>
                <Link href="" underline="hover" color="orange">
                  {postUser}
                </Link>
              </Typography>
              <Typography fontWeight={100}>{posts}</Typography>
            </Grid>
            <ButtonGroup>
              <List>
                <ListItem>
                  <ListItemButton onClick={handleUpvoteClick}>
                    <ArrowUpwardIcon></ArrowUpwardIcon>
                  </ListItemButton>
                  <p style={{ color: "#03a9f4" }}>{upvotes}</p>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemButton onClick={handleDownvoteClick}>
                    <ArrowDownwardIcon></ArrowDownwardIcon>
                  </ListItemButton>
                  <p style={{ color: "#ff9100" }}>{downvotes}</p>
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
