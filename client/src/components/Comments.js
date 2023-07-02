import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

const drawerWidth = 240;

const Comments = ({
  id,
  username,
  comment,
  commentThumbnailData,
  votes,
  fetchPostDetails,
  commentUserId,
  userId,
  addCoins,
  subtractCoins,
  fetchUserPosts,
  fetchUserComments,
  fetchProfileComments,
}) => {
  const navigate = useNavigate();
  // const { id } = useParams();
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 700,
    color: theme.palette.text.primary,
  }));

  const deleteButton =
    commentUserId === userId ? (
      <HighlightOffRoundedIcon
        style={{ color: "#D9381E" }}
        onClick={handleDeleteClick}
      />
    ) : null;

  function handleDeleteClick() {
    fetch(`/comment/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        //checks if the response is json
        if (res.headers.get("Content-Type").includes("application/json")) {
          res.json().then(() => fetchPostDetails());
        } else {
          fetchPostDetails();
        }
      } else {
        // Handle any error status codes
        console.error(
          `Error deleting comment with id ${id}: ${res.status} ${res.statusText}`
        );
      }
    });
  }

  //////////// upvotes && downvotes ////////////
  function handleUpvoteClick() {
    const newUpvotes = (votes += 1);

    addCoins();

    fetch(`/comment/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ votes: newUpvotes }),
    }).then((res) => {
      if (res.ok) {
        res
          .json()
          .then(
            fetchPostDetails,
            fetchUserPosts(userId),
            fetchUserComments(userId),
            fetchProfileComments()
          );
      } else {
        console.error(
          `Error upvoting comment with id ${id}: ${res.status} ${res.statusText}`
        );
      }
    });
  }

  function handleDownvoteClick() {
    const newDownvotes = (votes -= 1);

    subtractCoins();

    fetch(`/comment/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ votes: newDownvotes }),
    }).then((res) => {
      if (res.ok) {
        res
          .json()
          .then(
            fetchPostDetails,
            fetchUserPosts(userId),
            fetchUserComments(userId),
            fetchProfileComments()
          );
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
                {deleteButton}
              </ListItem>
            </List>
          </ButtonGroup>
        </Grid>
      </StyledPaper>
    </>
  );
};

export default Comments;
