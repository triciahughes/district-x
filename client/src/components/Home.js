import { useState } from "react";
import { styled } from "@mui/material/styles";
import NavBar from "./NavBar";
import Posts from "./Posts";
import SideBar from "./SideBar";

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

function Home() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <StyledRoot>
        <NavBar />
        <SideBar />
        {/* <Main> */}
        <Posts />
        {/* </Main> */}
      </StyledRoot>
    </>
  );
}

export default Home;
