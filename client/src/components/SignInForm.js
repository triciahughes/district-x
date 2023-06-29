import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";

const images = [
  "https://i.imgur.com/tgUZzzW.jpg",
  "https://i.imgur.com/Vh2IJ7I.jpg",
  "https://i.imgur.com/Hh13AJR.jpg",
  "https://i.imgur.com/KDQIlPn.jpg",
  "https://i.imgur.com/lWCDGYd.jpg",
  "https://i.imgur.com/012NZkH.jpg",
  "https://i.imgur.com/JbgIaSk.jpg",
  "https://i.imgur.com/Gz3MnU1.jpg",
];

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

const validationSchema = yup.object({
  username: yup.string("Enter your username").required("Username is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

function SignInForm({ setUser, fetchUser }) {
  const [index, setIndex] = useState(0);
  const history = useNavigate();
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = images.map(
        (url) =>
          new Promise(async (resolve) => {
            const response = await fetch(url);
            const blob = await response.blob();
            const reader = new FileReader();

            reader.onloadend = () => {
              const base64data = reader.result;
              setLoadedImages((loadedImages) => {
                return [...loadedImages, base64data];
              });
              resolve();
            };

            reader.readAsDataURL(blob);
          })
      );
      await Promise.all(promises);
    };

    preloadImages();
  }, [setLoadedImages]);

  useEffect(() => {
    if (loadedImages.length === images.length) {
      const intervalId = setInterval(() => {
        setIndex((index) => (index + 1) % images.length);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [loadedImages]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          res.json().then((userData) => {
            setUser(userData);
            fetchUser();
            history.push("/home");
          });
        } else {
          alert("Invalid username or password");
        }
      });
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loadedImages[index]})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                autoComplete="username"
                autoFocus
              />
              {formik.errors["username"] ? (
                <p style={{ color: "#D9381E" }}>{formik.errors["username"]}</p>
              ) : null}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                autoComplete="current-password"
              />
              {formik.errors["password"] ? (
                <p style={{ color: "#D9381E" }}>{formik.errors["password"]}</p>
              ) : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInForm;
