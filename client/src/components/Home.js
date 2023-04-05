import NavBar from "./NavBar/NavBar";
import Posts from "./Posts";

function Home({ handleLogout, userData }) {
  return (
    <>
      <NavBar handleLogout={handleLogout} userData={userData} />
      <Posts />
    </>
  );
}

export default Home;
