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
  console.log(posts);
  const postsList = posts.map((post) => {
    return (
      <Posts
        user={user}
        fetchPost={fetchPost}
        key={post.id}
        id={post.id}
        upvotes={post.upvotes}
        downvotes={post.downvotes}
        posts={post.post}
        postUser={post.user.username}
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
      {/* <Posts posts={posts} /> */}
      {postsList}
    </>
  );
}

export default Home;
