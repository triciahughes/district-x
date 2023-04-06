import NavBar from "./NavBar/NavBar";
import Posts from "./Posts";
import { Paper } from "@mui/material";
import CreatePost from "./CreatePost";

function Home({
  handleLogout,
  userData,
  posts,
  fetchPost,
  showCreatePost,
  setShowCreatePost,
  handleCreatePostClick,
  user,
}) {
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
      <Posts posts={posts} />
    </>
  );
}

export default Home;
