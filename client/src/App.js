// import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import * as React from "react";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import CreateAvatar from "./components/CreateAvatar";
import CreatePost from "./components/CreatePost";
import PostDetails from "./components/PostDetails";
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
          history.push("/home");
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

  // function handleUpvotesClick(postId) {
  //   fetch(`/posts/${postId}/upvote`, {
  //     method: "PUT",
  //   }).then((res) => {
  //     if (res.ok) {
  //       res.json().then((postData) => {
  //         fetchPost();
  //       });
  //     }
  //   });
  // }

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
      <Route path="/postdetails">
        <PostDetails user={user.username} handleLogOutClick={handleLogout} />
      </Route>
    </>
  );
}

export default App;
