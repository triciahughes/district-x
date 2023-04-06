import NavBar from "./NavBar/NavBar";
import Posts from "./Posts";
import { Paper } from "@mui/material";

function Home({ handleLogout, userData }) {
  return (
    <>
      <NavBar handleLogout={handleLogout} userData={userData} />
      <Posts />
    </>
  );
}

export default Home;
