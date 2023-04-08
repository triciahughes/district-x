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

const CreateComment = ({ id, userId }) => {
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

  console.log(id);
  console.log(userId);

  const validationSchema = yup.object({
    comment: yup.string("Enter comment").required("Comment is required"),
  });
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const submission = {
        ...values,
        user_id: userId,
      };
      console.log("clicked");
      console.log(submission);
      //   fetch("/createcomment", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(submission),
      //   }).then((res) => {
      //     if (res.ok) {
      //       res.json().then((commentData) => {
      //         console.log(commentData);
      //       });
      //     }
      //   });
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginBottom: 5,
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
                sx={{ mt: 2, mb: -1 }}
                id="comment"
                label="Comment"
                name="comment"
                value={formik.values.post}
                onChange={formik.handleChange}
                inputProps={{ maxLength: 140 }}
              />
            </Grid>
            <p style={{ color: "#ff9100" }}>140 characters max</p>
            <Button type="submit" variant="outlined" sx={{ mt: 2, mb: -1 }}>
              Submit
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default CreateComment;
