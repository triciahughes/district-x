import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import {
  Avatar,
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
  Typography,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import TelegramIcon from "@material-ui/icons/Telegram";
///////////// IMPORTS //////////////

const drawerWidth = 240;
const AllDistricts = ({
  user,
  handleLogout,
  userData,
  districts,
  districtName,
}) => {
  const history = useHistory();
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
  ///////////// STYLES //////////////
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 700,
    color: theme.palette.text.primary,
  }));

  const data = `data:image/jpeg;base64,${user.thumbnail}`;

  function handleHomeClick() {
    history.push("/home");
  }

  function handleUsernameClick() {
    history.push(`/profile/${userData.id}`);
  }

  function handlePostClick() {
    history?.push(`/district/${districts.id}`);
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
          {[`${user.username}`].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={data} />
                </ListItemAvatar>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List onClick={handleHomeClick}>
          {["Home"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <HomeIcon />
                </ListItemAvatar>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List onClick={handleLogout}>
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
        <Divider />
      </Drawer>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              marginBottom: -5,
              marginLeft: 65,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          ></Box>
        </Container>
      </ThemeProvider>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          px: 0,
          backgroundColor: "white",
        }}
      >
        <StyledPaper
          sx={{
            my: 1,
            mx: "auto",
            p: 2,
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <TelegramIcon fontSize="large" />
            </Grid>
            <Grid item xs>
              <Typography fontWeight={600}>
                <Link
                  href=""
                  underline="hover"
                  color="orange"
                  onClick={handlePostClick}
                >
                  {districtName}
                </Link>
              </Typography>
              <Link
                fontWeight={100}
                sx={{ color: "#949391" }}
                href=""
                underline="hover"
                onClick={handlePostClick}
              >
                {`${districts.posts.length} posts in this district`}
              </Link>
            </Grid>
          </Grid>
        </StyledPaper>
      </Box>
    </>
  );
};

export default AllDistricts;
