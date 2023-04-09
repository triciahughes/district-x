// import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import * as React from "react";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import CreateAvatar from "./components/CreateAvatar";
import CreatePost from "./components/CreatePost";
import PostDetails from "./components/PostDetails";
import UserProfile from "./components/UserProfile";
import Profile from "./components/Profile";
import Home from "./components/Home";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [user, setUser] = useState({});
  const [post, setPost] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const history = useHistory();

  const userFetch = useCallback(fetchUser, [history]);

  useEffect(() => {
    userFetch();
    fetchPost();
  }, [userFetch]);

  function fetchUser() {
    fetch("/authorized").then((res) => {
      if (res.ok) {
        res.json().then((userData) => {
          setUser(userData);
          // history.push("/home");
        });
      } else {
        setUser([]);
        history.push("/signin");
      }
    });
  }

  function fetchPost() {
    fetch("/posts").then((res) => {
      if (res.ok) {
        res.json().then((postData) => {
          setPost(postData);
        });
      }
    });
  }

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      setUser([]);
      fetchUser();
      history.push("/signin");
    });
  }

  function handleCreatePostClick() {
    setShowCreatePost(!showCreatePost);
  }

  return (
    <>
      <Route path="/signin">
        <SignInForm setUser={setUser} fetchUser={fetchUser} />
      </Route>
      <Route path="/signup">
        <SignUpForm setUser={setUser} fetchUser={fetchUser} />
      </Route>
      <Route path="/createavatar">
        <CreateAvatar
          fetchUser={fetchUser}
          user={user.username}
          userId={user.id}
        />
      </Route>
      <Route path="/home">
        <Home
          handleLogout={handleLogout}
          userData={user}
          posts={post}
          setPost={setPost}
          fetchPost={fetchPost}
          showCreatePost={showCreatePost}
          setShowCreatePost={setShowCreatePost}
          handleCreatePostClick={handleCreatePostClick}
          user={user}
        />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/post/:id">
        <PostDetails
          user={user.username}
          handleLogOutClick={handleLogout}
          userId={user.id}
          userThumbnail={user.thumbnail}
          fetchPost={fetchPost}
        />
      </Route>
      <Route path="/user/:id">
        <UserProfile />
      </Route>
      <Route path="/profile/:id">
        <Profile />
      </Route>
    </>
  );
}

export default App;
