import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Canvas from "../canvas";

const Customizer = ({ username, userId }) => {
  const history = useHistory();

  //   useEffect(() => {
  //     Define the event listener
  //     const handleAccountFinalized = (event) => {
  //       console.log("Received data from index.html:", event.detail);

  //       const backdropHue = event.detail.backdropHue;
  //       const clothingData = event.detail.clothing;
  //       const eyeStyle = event.detail.eyeStyle;
  //       const hairColor = event.detail.hairColor;
  //       const hairStyle = event.detail.hairStyle;
  //       const skinColor = event.detail.skinColor;
  //       const thumbnailData = event.detail.thumbnailBase64;

  //       fetch(`/createavatar/${userId}`, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           backdrop: backdropHue,
  //           clothingData: clothingData,
  //           eyeStyle: eyeStyle,
  //           hairColor: hairColor,
  //           hairStyle: hairStyle,
  //           skinColor: skinColor,
  //           thumbnail: thumbnailData,
  //         }),
  //       }).then((res) => {
  //         if (res.ok) {
  //           res.json().then(fetchUser(), history.push("/home"));
  //         }
  //       });
  //     };

  return (
    <>
      <Canvas username={username} userId={userId} />
    </>
  );
};

export default Customizer;
