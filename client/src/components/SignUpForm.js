import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@mui/material";

function SignUpForm() {
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
      <form variant="standard" onSubmit={formik.handleSubmit}>
        <TextField
          variant="filled"
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          placeholder="Username"
        />
        <br />
        <TextField
          variant="filled"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Password"
        />
        <br />
        <TextField
          variant="filled"
          type="password"
          name="confirm_password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          placeholder="Confirm Password"
        />
        <br />
        <Button type="submit" value="Sign Up">
          Sign Up
        </Button>
      </form>
    </>
  );
}

export default SignUpForm;
