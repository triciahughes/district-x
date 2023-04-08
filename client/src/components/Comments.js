import CreateComment from "./CreateComment";
import React from "react";
import { Grid, Paper, styled, Avatar, Typography, Link } from "@mui/material";
const drawerWidth = 240;

const Comments = ({ id, username, comment }) => {
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 700,
    color: theme.palette.text.primary,
  }));

  return (
    <>
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
              {username}
            </Link>
            <Typography
              fontWeight={100}
              fontSize={14}
              style={{ textAlign: "left", marginRight: 20 }}
            >
              {comment}
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </>
  );
};

export default Comments;
