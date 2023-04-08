import CreateComment from "./CreateComment";
import React from "react";
import { Grid, Paper, styled, Avatar, Typography, Link } from "@mui/material";
const drawerWidth = 240;

const Comments = () => {
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 700,
    color: theme.palette.text.primary,
  }));
  return (
    <>
      <CreateComment />
      <Typography align="center" fontWeight={100}>
        Comments
      </Typography>
      <StyledPaper
        sx={{
          my: 2,
          mx: "auto",
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src="" />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Link href="" underline="hover" color="#03a9f4">
              Michel Michel
            </Link>
            <Typography
              fontWeight={100}
              fontSize={14}
              style={{ textAlign: "left", marginRight: 20 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </>
  );
};

export default Comments;
