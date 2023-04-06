import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import { Link } from "react-router-dom";
function Posts({ posts }) {
  const postMap = posts.map((post) => {
    return post.user;
  });

  function handleUpvoteClick() {
    console.log("Clicked");
  }

  function handleDownvoteClick() {
    console.log("Clicked");
  }

  function handlePostClick() {
    console.log("Clicked");
  }
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 700,
    color: theme.palette.text.primary,
  }));

  const list = posts.map((post) => {
    return (
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          px: 3,
          backgroundColor: "white",
        }}
        key={post.id}
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
              <Avatar>W</Avatar>
            </Grid>
            <Grid item xs key={post.id} onClick={handlePostClick}>
              <Typography fontWeight={600}>
                <Link href="" underline="hover" color="orange">
                  {post.user.username}
                </Link>
              </Typography>
              <Typography fontWeight={100}>{post.post}</Typography>
            </Grid>
            <ButtonGroup>
              <List>
                <ListItem>
                  <ListItemButton onClick={handleUpvoteClick}>
                    <ArrowUpwardIcon></ArrowUpwardIcon>
                  </ListItemButton>
                  <p style={{ color: "#03a9f4" }}>{post.upvotes}</p>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemButton onClick={handleDownvoteClick}>
                    <ArrowDownwardIcon></ArrowDownwardIcon>
                  </ListItemButton>
                  <p style={{ color: "#ff9100" }}>{post.downvotes}</p>
                </ListItem>
              </List>
            </ButtonGroup>
            {/* <Button /> */}
            {/* <Button /> */}
          </Grid>
        </StyledPaper>
      </Box>
    );
  });

  return <>{list}</>;
}

export default Posts;
