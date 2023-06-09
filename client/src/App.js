// import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import * as React from "react";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import CreateAvatar from "./components/CreateAvatar";
import CreatePost from "./components/CreatePost";
import PostDetails from "./components/PostDetails";
import ProfilePosts from "./components/ProfilePosts";
import ProfileComments from "./components/ProfileComments";
import Profile from "./components/Profile";
import Home from "./components/Home";
import DistrictPage from "./Districts/DistrictPage";
import AllDistricts from "./Districts/AllDistricts";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Typography } from "@mui/material";
import SortIcon from "@material-ui/icons/Sort";
import { Button } from "@mui/material";

function App() {
  const [user, setUser] = useState({});
  const [post, setPost] = useState([]);
  const [profilePost, setProfilePost] = useState([]);
  const [userId, setUserId] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [districtsName, setDistrictsName] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postSortBool, setPostSortBool] = useState(false);
  const history = useHistory();

  const userFetch = useCallback(fetchUser, [history]);

  useEffect(() => {
    userFetch();
    fetchPost();
    fetchDistricts();
  }, [userFetch]);

  function fetchUser() {
    fetch("/authorized").then((res) => {
      if (res.ok) {
        res.json().then((userData) => {
          setUser(userData);
          setUserId(userData.id);
          fetchUserPosts(userData.id);
          fetchUserComments(userData.id);
        });
      } else {
        setUser([]);
        history.push("/signin");
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

  /////////// Post Fetching  & Functinality ////////////
  function fetchPost() {
    fetch("/posts").then((res) => {
      if (res.ok) {
        res.json().then((postData) => {
          setPost(postData);
        });
      }
    });
  }

  function fetchUserPosts(userId) {
    fetch(`/profileposts/${userId}`).then((res) => {
      if (res.ok) {
        res.json().then((userPostData) => {
          setUserPosts(userPostData);
        });
      }
    });
  }

  function fetchUserComments(userId) {
    fetch(`/profilecomments/${userId}`).then((res) => {
      if (res.ok) {
        res.json().then((userCommentData) => {
          setUserComments(userCommentData);
        });
      }
    });
  }

  function fetchProfilePost(id) {
    fetch(`/profileposts/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((profilePostData) => {
          console.log(profilePostData);
          setProfilePost(profilePostData);
          console.log("hello from profile post");
        });
      }
    });
  }

  function handleCreatePostClick() {
    setShowCreatePost(!showCreatePost);
  }

  //////////// District Sorting & Rendering Functionality ////////////
  function fetchDistricts() {
    fetch("/districts").then((res) => {
      if (res.ok) {
        res.json().then((districtData) => {
          setDistricts(districtData);
          const names = districtData.map((district) => district.name);
          setDistrictsName(names);
        });
      }
    });
  }
  // The 'localeCompare()' method is used to compare the names of the districts and ensure that the sorting is done alphabetically.
  // The function returns a negative number if 'a' should come before 'b', a positive number if 'a' should come after 'b', and zero if they are equal.
  // This ensures that the districts are sorted in ascending order based on their names.
  const sortedDistricts = [...districts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const districtList = sortedDistricts.map((district) => {
    return (
      <AllDistricts
        key={district.id}
        districts={district}
        districtName={district.name}
        user={user}
        handleLogout={handleLogout}
        // post={postData}
        userData={user}
      />
    );
  });

  const districtDetails = sortedDistricts.map((district) => {
    return district;
  });

  ////////////// Post Sorting Functionality //////////////

  function handleSortPostsClick() {
    setPostSortBool((current) => !current);
    console.log(postSortBool);
  }
  const filterButton = postSortBool ? (
    <Button onClick={handleSortPostsClick} style={{ color: "#ff9100" }}>
      <Typography style={{ color: "#ff9100" }}>Top</Typography>
      <SortIcon />
    </Button>
  ) : (
    <Button onClick={handleSortPostsClick}>
      <Typography style={{ color: "#03a9f4" }}>Top</Typography>
      <SortIcon />
    </Button>
  );

  const sortedArray = [...post].sort((a, b) => b.votes - a.votes);

  const postData = postSortBool ? sortedArray : post;

  ///////// User Coins Functionality //////////
  let totalCoins = 0;

  userPosts.forEach((post) => (totalCoins += post.votes));
  userComments.forEach((comment) => (totalCoins += comment.votes));

  const addCoins = () => (totalCoins += 1);
  const subtractCoins = () => (totalCoins -= 1);
  //* OLD CODE FOR USER COINS FUNCTIONALITY *//
  // let userCoins = userPosts
  //   .map((post) => post.votes)
  //   .reduce((a, b) => a + b, 0);

  // let userCommentsCoins = userComments
  //   .map((comments) => comments.votes)
  //   .reduce((a, b) => a + b, 0);
  // const addCoins = () => (userCoins += 1);
  // const subtractCoins = () => (userCoins -= 1);

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
          setPost={setPost}
          fetchPost={fetchPost}
          fetchUserPosts={fetchUserPosts}
          fetchProfilePost={fetchProfilePost}
          showCreatePost={showCreatePost}
          setShowCreatePost={setShowCreatePost}
          handleCreatePostClick={handleCreatePostClick}
          user={user}
          handleSortPostsClick={handleSortPostsClick}
          posts={postData}
          filterButton={filterButton}
          districts={sortedDistricts}
          districtsName={districtsName}
          totalCoins={totalCoins}
          addCoins={addCoins}
          subtractCoins={subtractCoins}
          sessionUserId={user.id}
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
          postSortBool={postSortBool}
          addCoins={addCoins}
          subtractCoins={subtractCoins}
          fetchUserPosts={fetchUserPosts}
          fetchUserComments={fetchUserComments}
          fetchProfilePost={fetchProfilePost}
          totalCoins={totalCoins}
        />
      </Route>
      <Route path="/profile/:id">
        <Profile
          user={user.username}
          handleLogout={handleLogout}
          fetchPost={fetchPost}
          userThumbnail={user.thumbnail}
          totalCoins={totalCoins}
        />
      </Route>
      <Route path="/profile/:id/posts">
        <ProfilePosts
          user={user}
          sessionUser={user.username}
          sessionUserId={user.id}
          handleLogout={handleLogout}
          userThumbnail={user.thumbnail}
          totalCoins={totalCoins}
          addCoins={addCoins}
          subtractCoins={subtractCoins}
          fetchUserPosts={fetchUserPosts}
          fetchUserComments={fetchUserComments}
          fetchProfilePost={fetchProfilePost}
          profilePost={profilePost}
        />
      </Route>
      <Route path="/profile/:id/comments">
        <ProfileComments
          user={user}
          sessionUser={user.username}
          sessionUserId={user.id}
          handleLogout={handleLogout}
          userThumbnail={user.thumbnail}
          totalCoins={totalCoins}
          addCoins={addCoins}
          subtractCoins={subtractCoins}
          fetchUserPosts={fetchUserPosts}
          fetchUserComments={fetchUserComments}
        />
      </Route>
      <Route path="/district/:id">
        <DistrictPage
          user={user}
          handleLogout={handleLogout}
          handleCreatePostClick={handleCreatePostClick}
          showCreatePost={showCreatePost}
          setShowCreatePost={setShowCreatePost}
          post={postData}
          filterButton={filterButton}
          districtDetails={districtDetails}
          fetchPost={fetchPost}
        />
      </Route>
      <Route path="/districts/all">{districtList}</Route>
    </>
  );
}

export default App;
