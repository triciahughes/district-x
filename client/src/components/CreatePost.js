import React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";
///////////// IMPORTS //////////////

const CreatePost = ({ user, setShowCreatePost, fetchPost }) => {
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

  const userId = user.id;

  const validationSchema = yup.object({
    post: yup.string("Enter post").required("Post is required"),
  });
  const formik = useFormik({
    initialValues: {
      post: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const submission = {
        ...values,
        user_id: userId,
        votes: 0,
      };
      console.log("clicked");
      console.log(submission);
      fetch("/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      }).then((res) => {
        if (res.ok) {
          res.json().then((postData) => {
            fetchPost();
            setShowCreatePost(false);
            setSubmitting(false);
          });
        }
      });
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 5,
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create post
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={(e) => {
              e.preventDefault();
              console.log("submitted");
              formik.handleSubmit();
            }}
          >
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                sx={{ mt: 3, mb: -1 }}
                id="post"
                label="Post"
                name="post"
                value={formik.values.post}
                onChange={formik.handleChange}
                inputProps={{ maxLength: 140 }}
              />
            </Grid>
            <p style={{ color: "#ff9100" }}>140 characters max</p>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 2, mb: 1 }}
            >
              Submit
            </Button>
            <Button
              type="click"
              onClick={() => setShowCreatePost(false)}
              fullWidth
              variant="outlined"
              sx={{
                mt: 2,
                mb: 1,
                color: "error.main",
                borderColor: "#D9381E",
              }}
            >
              Cancel
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default CreatePost;
