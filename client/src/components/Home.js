import NavBar from "./NavBar/NavBar";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
import SortIcon from "@material-ui/icons/Sort";
import { Button, Grid } from "@mui/material";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";

function Home({
  handleLogout,
  userData,
  posts,
  fetchPost,
  showCreatePost,
  setShowCreatePost,
  handleCreatePostClick,
  user,
  handleSortPostsClick,
  filterButton,
  // sortedPosts,
}) {
  // const [postSortBool, setPostSortBool] = useState(false);
  // const [sortedPosts, setSortedPosts] = useState(posts);
  ///////////// STYLES //////////////
  const theme = createTheme({
    palette: {
      primary: {
        main: "#03a9f4",
      },
      secondary: {
        main: "#ff9100",
      },
    },
  });

  const postsList = posts?.map((post) => {
    return (
      <Posts
        user={user}
        fetchPost={fetchPost}
        key={post.id}
        id={post.id}
        votes={post.votes}
        posts={post.post}
        postUser={post.user.username}
        postData={posts}
        postUserId={post.user.id}
        userData={userData}
        postThumbnailData={post.user.thumbnail}
      />
    );
  });
  return (
    <>
      <NavBar
        handleLogout={handleLogout}
        userData={userData}
        handleCreatePostClick={handleCreatePostClick}
      />
      {showCreatePost ? (
        <CreatePost
          user={user}
          setShowCreatePost={setShowCreatePost}
          fetchPost={fetchPost}
        />
      ) : null}
      <ThemeProvider theme={theme}>
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
            <Grid>
              {/* <Button onClick={handleSortPostsClick}> */}
              {filterButton}
              {/* <SortIcon />
              </Button> */}
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
      {postsList}
    </>
  );
}

export default Home;
