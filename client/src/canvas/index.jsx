import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Center } from "@react-three/drei";
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
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 22 }}
        gl={{ preserveDrawingBuffer: true }}
        style={{
          position: "fixed",
          width: width,
          height: height,
        }}
      >
        <Backdrop />
      </Canvas>

      <Canvas
        shadows
        camera={{ position: [0, 0, 13], fov: 20 }}
        gl={{ preserveDrawingBuffer: true }}
        style={{
          position: "fixed",
          width: width,
          height: height,
        }}
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
        <OrbitControls
          target={[0, 0, 0]}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <CameraRig>
          <Center>
            <Avatar position={[0.15, -1.7, 0]} />
          </Center>
        </CameraRig>
      </Canvas>
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
      <RightArrowIcon top="25%" />
      <RightArrowIcon top="50%" />
      <RightArrowIcon top="75%" />

      <LeftArrowIcon top="25%" />
      <LeftArrowIcon top="50%" />
      <LeftArrowIcon top="75%" />

      <FinalizeCharacterBtn />
    </div>
  );
};

export default CanvasModel;
