import React from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as yup from "yup";

const CreatePost = ({ user, setShowCreatePost, fetchPost }) => {
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
        upvotes: 0,
        downvotes: 0,
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
            console.log(postData);
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
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   formik.handleSubmit();
            // }}
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
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default CreatePost;
