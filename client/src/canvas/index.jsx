import { Canvas, act, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import React, { useState, useEffect } from "react";
import {
  RightArrowIcon,
  LeftArrowIcon,
  FinalizeCharacterBtn,
  ColorPicker,
  ColorPickerBtn,
} from "../components/index";

import {
  hairStyle1,
  hairStyle2,
  hairStyle3,
  hairStyle4,
  hairStyle5,
  hairStyle6,
} from "../assets";

import AvatarAbbi from "./AvatarAbbi";
import AvatarQuin from "./AvatarQuin";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import { Color } from "three";
import { useSnapshot } from "valtio";
import state from "../store";

const CanvasModel = ({ username, userId }) => {
  const snap = useSnapshot(state);
  const [orbit, setOrbit] = useState([-0.3, 0.75, 0]);
  const [position, setPosition] = useState([0, 0, 0]);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 13]);
  const [outfit, setOutfit] = useState({
    model: true,
    texture: "/T_Dx_Female_Outfit_01.png",
  });
  const [face, setFace] = useState("/T_Dx_EyeCard_Default.png");
  const [hair, setHair] = useState(hairStyle1);
  const [avatar, setAvatar] = useState(true);

  //// canvas size ////
  const width = window.innerWidth;
  const height = window.innerHeight;

  // const [activeFunction, setActiveFunction] = useState("");
  const handleActiveFunction = (activeFunction) => {
    // if (activeFunction === "nextOutfit") {
    //   handleRightOutfitClick();
    // }
    switch (activeFunction) {
      case "nextOutfit":
        handleRightOutfitClick();
        break;
      case "prevOutfit":
        handleLeftOutfitClick();
        break;
      case "nextEyes":
        handleRightFaceClick();
        break;
      case "prevEyes":
        handleLeftFaceClick();
        break;
      case "nextHair":
        handleRightHairClick();
        break;
    }
  };

  ////// Hair Changing Logic ////////

  const hairArray = [
    hairStyle1,
    hairStyle2,
    hairStyle3,
    hairStyle4,
    hairStyle5,
    hairStyle6,
  ];

  const handleRightHairClick = () => {
    const currentHairIndex = hairArray.findIndex((item) => item === hair);
    const nextHairIndex = (currentHairIndex + 1) % hairArray.length;

    setHair(hairArray[nextHairIndex]);
    console.log("hair", hair);
  };

  /////// Face Changing Logic ////////
  const facesArray = [
    "/T_Dx_EyeCard_Default.png",
    "/T_Dx_EyeCard_Angry.png",
    "/T_Dx_EyeCard_Happy.png",
    "/T_Dx_EyeCard_Sad.png",
    "/T_Dx_EyeCard_Wince.png",
    "/T_Dx_EyeCard_Xs.png",
    "/T_Dx_EyeCard_Eyelashes.png",
  ];

  const handleRightFaceClick = () => {
    const currentFaceIndex = facesArray.findIndex((item) => item === face);
    const nextFaceIndex = (currentFaceIndex + 1) % facesArray.length;

    setFace(facesArray[nextFaceIndex]);
    console.log("face", face);
  };
  const handleLeftFaceClick = () => {
    const currentFaceIndex = facesArray.findIndex((item) => item === face);
    const nextFaceIndex =
      (currentFaceIndex - 1 + facesArray.length) % facesArray.length;

    setFace(facesArray[nextFaceIndex]);
    console.log("face", face);
  };

  /////// Outfit Changing Logic ///////
  const outfitsArray = [
    { model: true, texture: "/T_Dx_Female_Outfit_01.png" },
    { model: true, texture: "/T_Dx_Female_Outfit_02.png" },
    { model: true, texture: "/T_Dx_Female_Outfit_03.png" },
    { model: false, texture: "/T_Dx_Male_Outfit_01.png" },
    { model: false, texture: "/T_Dx_Male_Outfit_02.png" },
    { model: false, texture: "/T_Dx_Male_Outfit_03.png" },
  ];

  // Function to handle the click event for changing the outfit to the right
  const handleRightOutfitClick = () => {
    // Get the index of the current outfit in the outfitsArray
    const currentOutfitIndex = outfitsArray.findIndex(
      (item) => item.model === outfit.model && item.texture === outfit.texture
    );

    // Calculate the index of the next outfit, wrapping around to 0 if necessary
    const nextOutfitIndex = (currentOutfitIndex + 1) % outfitsArray.length;

    // Update the outfit state with the URL of the next outfit
    setOutfit(outfitsArray[nextOutfitIndex]);

    setOrbit([-0.3, 0.75, 0]);
    setPosition([0, 0, 0]);
    setCameraPosition([0, 0, 13]);
    console.log(orbit, position, avatar);
  };

  // Function to handle the click event for changing the outfit to the left
  const handleLeftOutfitClick = () => {
    // Get the index of the current outfit in the outfitsArray
    const currentOutfitIndex = outfitsArray.findIndex(
      (item) => item.model === outfit.model && item.texture === outfit.texture
    );

    // Calculate the index of the previous outfit, wrapping around to the last index if necessary
    const previousOutfitIndex =
      (currentOutfitIndex - 1 + outfitsArray.length) % outfitsArray.length;

    // Update the outfit state with the URL of the previous outfit
    setOutfit(outfitsArray[previousOutfitIndex]);

    setOrbit([-0.3, 0.75, 0]);
    setPosition([0, 0, 0]);
    setCameraPosition([0, 0, 13]);
    console.log(orbit, position, avatar);
  };

  const getComplementaryColor = (hexColor) => {
    // Convert hexColor to RGB
    const rgbColor =
      hexColor.charAt(0) === "#" ? hexColor.substring(1, 7) : hexColor;
    const r = parseInt(rgbColor.substring(0, 2), 16);
    const g = parseInt(rgbColor.substring(2, 4), 16);
    const b = parseInt(rgbColor.substring(4, 6), 16);

    // Get the complementary color by subtracting each color value from 255
    const rComplement = 150 + r;
    const gComplement = 150 - g;
    const bComplement = 150 - b;

    // Convert the complementary RGB color back to hexadecimal
    const hexComplement =
      "#" +
      ((1 << 24) + (rComplement << 16) + (gComplement << 8) + bComplement)
        .toString(16)
        .slice(1)
        .toUpperCase();

    return hexComplement;
  };

  const newColor = getComplementaryColor(snap.color);

  return (
    <div>
      {/* First Canvas for the Backdrop component */}
      <Canvas
        shadows
        camera={{ position: cameraPosition, fov: 20 }} // Camera configuration
        gl={{ preserveDrawingBuffer: true }} // WebGL configuration
        style={{
          position: "fixed",
          width: width,
          height: height,
          background: `linear-gradient(${snap.color}, ${newColor})`,
        }}
      >
        <Backdrop /> {/* Backdrop component */}
      </Canvas>

      {/* Second Canvas for Avatar and OrbitControls */}
      <Canvas
        shadows
        camera={{ position: cameraPosition, fov: 20 }} // Camera configuration
        gl={{ preserveDrawingBuffer: true }} // WebGL configuration
        style={{
          // position: "relative",
          width: width,
          height: height,
        }}
      >
        <ambientLight intensity={0.5} /> {/* Light configuration */}
        <Environment preset="city" /> {/* Environment configuration */}
        <OrbitControls // OrbitControls for camera rotation
          target={orbit}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <CameraRig>
          {" "}
          {/* CameraRig component */}
          <Center>
            {/* Avatar component with specified position */}
            {outfit.model ? (
              <AvatarAbbi
                position={position}
                outfit={outfit}
                face={face}
                hair={hair}
              />
            ) : (
              <AvatarQuin
                position={position}
                outfit={outfit}
                face={face}
                hair={hair}
              />
            )}
            {/* // <Avatar position={position} outfit={outfit} /> */}
            {/* // <Avatar position={position} outfit={outfit} /> */}
          </Center>
        </CameraRig>
      </Canvas>
      {/* Display Username */}
      <div
        style={{
          position: "fixed",
          left: 600,
          top: 15,
          padding: "15px",
          backgroundColor: "rgba(225, 225, 225, .25)",
          boxShadow: "0 2px 30px rgba(31, 38, 135, .07)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(225, 225, 225, .18)",
          color: "rgba(45, 169, 227)",
          fontSize: "1.75rem",
          border: "none",
          borderRadius: "7px",
          width: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {username}
      </div>
      <ColorPickerBtn ColorPicker={ColorPicker} />
      {/* Customize Arrow Icons */}
      <RightArrowIcon
        top="25%"
        handleActiveFunction={handleActiveFunction}
        activeFunction={"nextHair"}
      />
      <RightArrowIcon
        top="50%"
        // handleRightFaceClick={handleRightFaceClick}
        handleActiveFunction={handleActiveFunction}
        activeFunction={"nextEyes"}
      />
      <RightArrowIcon
        top="75%"
        // handleRightOutfitClick={handleRightOutfitClick}
        handleActiveFunction={handleActiveFunction}
        activeFunction={"nextOutfit"}
        // activeFunction={activeFunction}
      />

      <LeftArrowIcon top="25%" />
      <LeftArrowIcon
        top="50%"
        handleActiveFunction={handleActiveFunction}
        activeFunction={"prevEyes"}
      />
      <LeftArrowIcon
        top="75%"
        handleActiveFunction={handleActiveFunction}
        activeFunction={"prevOutfit"}
        // handleLeftOutfitClick={handleLeftOutfitClick}
      />

      {/* Button to Finalize Character */}
      <FinalizeCharacterBtn />
    </div>
  );
};

export default CanvasModel;
