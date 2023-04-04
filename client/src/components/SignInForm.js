import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { FormControl, Input, InputLabel, Box, Button } from "@mui/material";

function SignInForm() {
  const history = useHistory();
  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter valid username."),
    password: yup.string().required("Must enter password."),
    confirm_password: yup
      .string()
      .required("Must confirm password.")
      .oneOf([yup.ref("password"), null], "Passwords must match."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // fetch("/signup", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(values),
      // })
      //   .then((res) => res.json())
      //   .then((data) => console.log(data))
      //   .then(history.push("/"));
      // resetForm({ values: "" });
    },
  });
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl variant="standard" onSubmit={formik.handleSubmit}>
          <InputLabel htmlFor="component-simple">Username</InputLabel>
          <Input
            // id="component-simple"
            // defaultValue="Composed TextField"
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Password</InputLabel>
          <Input
            // id="component-simple"
            // defaultValue="Composed TextField"
            type="password"
            name="confirm_password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Confirm Password</InputLabel>
          <Input
            // id="component-simple"
            // defaultValue="Composed TextField"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </FormControl>
        <Input type="submit" value="Sign In"></Input>
      </Box>
    </>
  );
}

export default SignInForm;
