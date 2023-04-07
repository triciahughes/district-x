import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Grid,
  Box,
  Paper,
  styled,
  Avatar,
  Typography,
  Link,
  ButtonGroup,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
const drawerWidth = 240;

const PostDetails = ({ handleLogOutClick, postUser, user }) => {
  ///////////// STYLES //////////////
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 700,
    color: theme.palette.text.primary,
  }));
  const [postDetails, setPostDetails] = useState();

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetch(`/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPostDetails(data);
      });
  }, [id]);

  console.log(postDetails);

  function handleUsernameClick() {
    console.log("clicked");
  }

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List onClick={handleUsernameClick}>
          {[`${user}`].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <AccountCircleIcon />
                  {/* <Avatar alt="Profile Picture" src="" /> */}
                </ListItemAvatar>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List onClick={handleLogOutClick}>
          {["Logout"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          px: 3,
          backgroundColor: "white",
        }}
      >
        <StyledPaper
          sx={{
            my: 2,
            mx: "auto",
            p: 2,
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar>L</Avatar>
            </Grid>
            <Grid item xs>
              <Typography fontWeight={600}>
                <Link href="" underline="hover" color="orange">
                  username here
                </Link>
              </Typography>
              <Typography fontWeight={100}>post here</Typography>
            </Grid>
            <ButtonGroup>
              <List>
                <ListItem>
                  {/* <ListItemButton onClick={handleUpvoteClick}>
                    <ArrowUpwardIcon
                      sx={{ color: "#D0DB61" }}
                    ></ArrowUpwardIcon>
                  </ListItemButton> */}
                  <p style={{ color: "#03a9f4" }}>votes here</p>
                  {/* <ListItemButton onClick={handleDownvoteClick}>
                    <ArrowDownwardIcon
                      sx={{ color: "#D9381E" }}
                    ></ArrowDownwardIcon>
                  </ListItemButton> */}
                </ListItem>
              </List>
            </ButtonGroup>
          </Grid>
        </StyledPaper>
      </Box>
    </>
  );
};

export default PostDetails;
