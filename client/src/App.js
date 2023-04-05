// import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import * as React from "react";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import CreateAvatar from "./components/CreateAvatar";
import Home from "./components/Home";

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
