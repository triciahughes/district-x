// import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import * as React from "react";
import CreateAvatar from "./CreateAvatar";

function App() {
  // Code goes here!
  return (
    <>
      <Route path="/signin">
        <SignInForm />
      </Route>
      <Route path="/signup">
        <SignUpForm />
      </Route>
      <Route path="/createavatar">
        <CreateAvatar />
      </Route>
    </>
  );
}

export default App;
