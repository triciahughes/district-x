import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import React from "react";
import {
  RightArrowIcon,
  LeftArrowIcon,
  FinalizeCharacterBtn,
} from "../components";

import Avatar from "./Avatar";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

const CanvasModel = ({ username, userId }) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <div>
      {/* First Canvas for the Backdrop component */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 13], fov: 22 }} // Camera configuration
        gl={{ preserveDrawingBuffer: true }} // WebGL configuration
        style={{
          position: "fixed",
          width: width,
          height: height,
        }}
      >
        <Backdrop /> {/* Backdrop component */}
      </Canvas>

      {/* Second Canvas for Avatar and OrbitControls */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 13], fov: 20 }} // Camera configuration
        gl={{ preserveDrawingBuffer: true }} // WebGL configuration
        style={{
          position: "fixed",
          width: width,
          height: height,
        }}
      >
        <ambientLight intensity={0.5} /> {/* Light configuration */}
        <Environment preset="city" /> {/* Environment configuration */}
        <OrbitControls // OrbitControls for camera rotation
          target={[-0.1, 0, 0]}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <CameraRig>
          {" "}
          {/* CameraRig component */}
          <Center>
            {/* Avatar component with specified position */}
            <Avatar position={[0, 0, 0]} />
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
      {/* Customize Arrow Icons */}
      <RightArrowIcon top="25%" />
      <RightArrowIcon top="50%" />
      <RightArrowIcon top="75%" />

      <LeftArrowIcon top="25%" />
      <LeftArrowIcon top="50%" />
      <LeftArrowIcon top="75%" />

      {/* Button to Finalize Character */}
      <FinalizeCharacterBtn />
    </div>
  );
};

export default CanvasModel;
