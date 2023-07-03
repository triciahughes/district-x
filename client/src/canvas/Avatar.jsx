import * as THREE from "three";
import { TextureLoader } from "three";
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
// import { useLoader } from "react-three-fiber";

const Avatar = ({ position, outfit }) => {
  const groupRef = useRef();
  const { nodes, materials, animations, scene } = useGLTF(`${outfit.model}`);
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    console.log("Available animations: ", actions);
    // console.log("Animations:", animations);

    if (actions.Anim_Idle_Quin_0) {
      actions.Anim_Idle_Quin_0.play();
    } else if (actions.Anim_Idle_Abbi_0) {
      actions.Anim_Idle_Abbi_0.play();
    } else {
      console.warn("There is no animation named 'idle'");
    }

    // array of the names of the nodes needed
    var nodesToSelect = ["head", "neck_01", "hand_l", "hand_r"];

    // get the nodes from the scene
    var selectedNodes = nodesToSelect.map((nodeName) =>
      scene.getObjectByName(nodeName)
    );
    // selectedNodes is now an array
  }, [actions, scene]);

  useEffect(() => {
    console.log("Avatar position changed:", position);
  }, [position]);

  // Create an AxesHelper to visualize the pivot point
  useEffect(() => {
    const axesHelper = new THREE.AxesHelper(5);
    groupRef.current.add(axesHelper);
  }, []);

  console.log(outfit);

  console.log(materials);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(`${outfit.texture}`);

    // Flip the texture along the Y-axis
    texture.flipY = false;
    // update the color space to be sRGB
    texture.colorSpace = "srgb";

    const avatarClothingMaterial =
      materials["M_Clothing_01"] || materials["MI_Clothing_Abbi_02"];
    if (avatarClothingMaterial) {
      avatarClothingMaterial.map = texture;
      avatarClothingMaterial.needsUpdate = true;
    }
  }, [materials, outfit]);

  return (
    <>
      <group ref={groupRef} position={position}>
        <primitive object={scene} />
      </group>
    </>
  );
};

export default Avatar;
