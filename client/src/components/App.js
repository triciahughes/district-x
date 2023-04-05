// import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import * as React from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import CreateAvatar from "./CreateAvatar";
import Home from "./Home";

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
      <Route path="/home">
        <Home />
      </Route>
    </>
  );
}

export default App;
