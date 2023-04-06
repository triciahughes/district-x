import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { borderColor } from "@mui/system";
import Link from "@mui/material/Link";
// import { Link } from "react-router-dom";
function Posts({ posts }) {
  const postMap = posts.map((post) => {
    return post.user;
  });

  console.log(postMap);

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

  // const messages = ["hi", "hello", "bye"];

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
                  Username here
                </Link>
              </Typography>
              <Typography fontWeight={100}>{post.post}</Typography>
            </Grid>
            <Button />
          </Grid>
        </StyledPaper>
      </Box>
    );
  });

  return <>{list}</>;
}

export default Posts;
