import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AccountInitialized } from "../unreal/unrealFunctionLibrary";

function CreateAvatar({ fetchUser, user, userId, clothingData }) {
  const navigate = useNavigate();

  console.log(userId, clothingData.texture);

  // const convertedClothingData = clothingData.map((item) => {
  //   return item.texture;
  // });

  // console.log(convertedClothingData);

  if (clothingData.texture === "/T_Dx_Female_Outfit_01.png") {
    let convertedClothingData = 1;
    console.log(true);
    console.log(convertedClothingData);
  }

  AccountInitialized({ name: `${user}` });

  useEffect(() => {
    // Define the event listener
    const handleAccountFinalized = (event) => {
      console.log("Received data from index.html:", event.detail);

      const backdropHue = event.detail.backdropHue;
      const clothingData = event.detail.clothing;
      const eyeStyle = event.detail.eyeStyle;
      const hairColor = event.detail.hairColor;
      const hairStyle = event.detail.hairStyle;
      const skinColor = event.detail.skinColor;
      const thumbnailData = event.detail.thumbnailBase64;

      fetch(`/createavatar/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          backdrop: backdropHue,
          clothingData: clothingData,
          eyeStyle: eyeStyle,
          hairColor: hairColor,
          hairStyle: hairStyle,
          skinColor: skinColor,
          thumbnail: thumbnailData,
        }),
      }).then((res) => {
        if (res.ok) {
          res.json().then(fetchUser(), navigate("/home"));
        }
      });
    };

    document.addEventListener("accountFinalized", handleAccountFinalized);

    return () => {
      document.removeEventListener("accountFinalized", handleAccountFinalized);
    };
  }, []);

  return <></>;
}

export default CreateAvatar;
