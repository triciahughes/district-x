import React, { useEffect, useRef } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

const Avatar = ({ position }) => {
  const texture = useLoader(
    TextureLoader,
    "/Avatar_Abbi_WithAnim_clothing_01.png"
  ); // use useLoader to load the texture
  const { scene } = useGLTF("/Avatar_Abbi_WithAnim.glb");

  //Set the texture to the 0th material in the scene
  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh) {
        // console.log("Mesh name: ", node.name);
        // console.log("UV1 map: ", node.geometry.attributes.uv);
        // console.log("UV2 map: ", node.geometry.attributes.uv2);
        // create new material using the loaded texture
        const newMaterial = new THREE.MeshStandardMaterial({ map: texture });
        node.material = newMaterial;
        console.dir(node);
        console.dir(node.material);
      }
    });
  }, [scene, texture]);

  // scene.traverse(function (child) {
  //   if (child instanceof THREE.Mesh && child.material.materialIndex === 0) {
  //     // Create a new material that uses the loaded texture
  //     const material = new THREE.MeshBasicMaterial({ map: texture });
  //     child.material = material;
  //   }
  // });

  return (
    <>
      <group position={position}>
        <primitive object={scene} />
      </group>
    </>
  );

  // const texture = new THREE.Texture("/Avatar_Abbi_WithAnim_clothing_01.png");
  // texture.load("/Avatar_Abbi_WithAnim_clothing_01.png");
  // const Model = () => {
  //   const { scene } = useGLTF("/Avatar_Abbi_WithAnim.glb");
  //   return <primitive object={scene} />;
  // };
  // return (
  //   <group>
  //     <Model />
  //   </group>
  // );
};

export default Avatar;
