import React from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Paper,
  styled,
  Avatar,
  Typography,
  Link,
  ButtonGroup,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
} from "@mui/icons-material";
const drawerWidth = 240;

const Comments = ({
  id,
  username,
  comment,
  commentThumbnailData,
  votes,
  fetchPostDetails,
  commentUserId,
}) => {
  const history = useHistory();
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 700,
    color: theme.palette.text.primary,
  }));

  //////////// upvotes && downvotes ////////////
  function handleUpvoteClick() {
    const newUpvotes = (votes += 1);

    fetch(`/comment/${id}`, {
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

    fetch(`/comment/${id}`, {
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

  ////////// thumbnail conversion /////////////
  const commentThumbnail = `data:image/jpeg;base64,${commentThumbnailData}`;

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
            <Avatar alt="Remy Sharp" src={commentThumbnail} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Link
              href={`/profile/${username.id}`}
              underline="hover"
              color="#03a9f4"
            >
              {username.username}
            </Link>
            <Typography
              fontWeight={100}
              fontSize={14}
              style={{ textAlign: "left", marginRight: 20 }}
            >
              {comment}
            </Typography>
          </Grid>
          <ButtonGroup>
            <List>
              <ListItem>
                <ListItemButton onClick={handleUpvoteClick}>
                  <ArrowUpwardIcon sx={{ color: "#D0DB61" }}></ArrowUpwardIcon>
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
    </>
  );
};

export default Comments;
