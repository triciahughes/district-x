import NavBar from "./NavBar/NavBar";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
import { Grid } from "@mui/material";
import { Box, Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Home({
  handleLogout,
  userData,
  posts,
  fetchPost,
  fetchUserPosts,
  fetchProfilePost,
  showCreatePost,
  setShowCreatePost,
  handleCreatePostClick,
  user,
  filterButton,
  districts,
  districtsName,
  totalCoins,
  addCoins,
  subtractCoins,
}) {
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
        fetchUserPosts={fetchUserPosts}
        fetchProfilePost={fetchProfilePost}
        key={post.id}
        id={post.id}
        votes={post.votes}
        posts={post.post}
        postUser={post.user.username}
        postData={posts}
        postUserId={post.user.id}
        userData={userData}
        postThumbnailData={post.user.thumbnail}
        commentsCount={post.comments.length}
        postDistrict={post.district?.name}
        postDistrictId={post.district?.id}
        totalCoins={totalCoins}
        addCoins={addCoins}
        subtractCoins={subtractCoins}
      />
    );
  });
  return (
    <>
      <NavBar
        handleLogout={handleLogout}
        userData={userData}
        handleCreatePostClick={handleCreatePostClick}
        districts={districts}
        totalCoins={totalCoins}
      />
      {showCreatePost ? (
        <CreatePost
          user={user}
          setShowCreatePost={setShowCreatePost}
          fetchPost={fetchPost}
          districtsName={districtsName}
          districts={districts}
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
            <Grid>{filterButton}</Grid>
          </Box>
        </Container>
      </ThemeProvider>
      {postsList}
    </>
  );
}

export default Home;
