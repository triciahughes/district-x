import NavBar from "./NavBar/NavBar";
import Posts from "./Posts";
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
  const postsList = posts.map((post) => {
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
      {postsList}
    </>
  );
}

export default Home;
