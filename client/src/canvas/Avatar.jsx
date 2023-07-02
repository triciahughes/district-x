import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

const Avatar = ({ position }) => {
  const groupRef = useRef();
  const { nodes, materials, animations, scene } = useGLTF(
    "/SM_Dx_Avatar_Male.glb"
  );
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    console.log("Available animations: ", actions);
    if (actions.Anim_Idle_Quin_0) {
      actions.Anim_Idle_Quin_0.play();
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
    console.log(selectedNodes);
  }, [actions, scene]);

  useEffect(() => {
    console.log("Avatar position changed:", position);
  }, [position]);

  // Create an AxesHelper to visualize the pivot point
  useEffect(() => {
    const axesHelper = new THREE.AxesHelper(5);
    groupRef.current.add(axesHelper);
  }, []);

  // const texture = useLoader(
  //   TextureLoader,
  //   "/Avatar_Abbi_WithAnim_clothing_01.png"
  // );

  //Set the texture to the 0th material in the scene
  // useEffect(() => {
  //   scene.traverse((node) => {
  //     if (node.isMesh) {
  //       // console.log("Mesh name: ", node.name);
  //       // console.log("UV1 map: ", node.geometry.attributes.uv);
  //       // console.log("UV2 map: ", node.geometry.attributes.uv2);
  //       // create new material using the loaded texture
  //       const newMaterial = new THREE.MeshStandardMaterial({ map: texture });
  //       node.material = newMaterial;
  //       console.dir(node);
  //       console.dir(node.material);
  //     }
  //   });
  // }, [scene, texture]);

  return (
    <>
      <group ref={groupRef} position={position}>
        <primitive object={scene} />
      </group>
    </>
  );
};

export default Avatar;
