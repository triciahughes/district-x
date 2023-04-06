import NavBar from "./NavBar/NavBar";
import Posts from "./Posts";
import { Paper } from "@mui/material";

function Home({ handleLogout, userData, posts }) {
  return (
    <>
      <NavBar handleLogout={handleLogout} userData={userData} />
      <Posts posts={posts} />
    </>
  );
}

export default Home;
