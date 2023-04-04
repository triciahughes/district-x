// import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import * as React from "react";
// import Button from "@mui/material/Button";

function App() {
  // Code goes here!
  return (
    <>
      {/* <Button>Hello</Button> */}
      <Route path="/signin">
        <SignInForm />
      </Route>
      <Route path="/signup">
        <SignUpForm />
      </Route>
      {/* <Header />
      <Route path="/signin">
        <SignInForm />
      </Route>
      <Route path="/signup">
        <SignUpForm />
      </Route>
      <Route exact path="/"></Route> */}
    </>
  );
}

export default App;
