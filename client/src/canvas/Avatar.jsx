import { Decal, useGLTF, useTexture } from "@react-three/drei";

import React from "react";

const Avatar = () => {
  const Model = () => {
    const { scene } = useGLTF("/plantExample.glb");
    return <primitive object={scene} />;
  };
  return (
    <group>
      <Model />
    </group>
  );
};

export default Avatar;
