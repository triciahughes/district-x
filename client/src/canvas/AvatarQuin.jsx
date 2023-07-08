import * as THREE from "three";
import { TextureLoader } from "three";
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { useLoader } from "react-three-fiber";

const AvatarQuin = ({ position, outfit, face, hair, newHairColor }) => {
  const groupRef = useRef();
  const { nodes, materials, animations, scene } = useGLTF(
    `SM_Dx_Avatar_Male.glb`
  );

  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    const hairGLTFLoader = new GLTFLoader();

    hairGLTFLoader.load(hair, (gltf) => {
      const hairGLTF = gltf;
      const hairMesh = hairGLTF.scene.children[0].clone();

      if (hairGLTF) {
        const headBone = scene.getObjectByName("head");

        const axesHelper = new THREE.AxesHelper(5);
        headBone.add(axesHelper);
        // Remove existing hair mesh if one exists
        const existingHairMesh = headBone.getObjectByName("hairMesh");
        if (existingHairMesh) {
          headBone.remove(existingHairMesh);
        }

        hairMesh.position.set(0.2, 0, 0);
        hairMesh.rotation.set(0, 0, -1.5708);

        if (hair.includes("Female")) {
          hairMesh.position.set(0.03, 0, 0.09);
          hairMesh.rotation.set(0, 0.05, -1.5708);
        }
        hairMesh.name = `hairMesh`; // Give a name to the hair mesh for easier tracking

        headBone.add(hairMesh);
        console.log("Hair mesh added to head bone:", hairMesh.material);

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(`${hair}`);

        console.log("hair material:", hairMesh.material);
        console.log(newHairColor);

        // const avatarHairMaterial = hairMesh.material;

        // console.log(avatarHairMaterial.color);
        hairMesh.material.color = new THREE.Color(
          newHairColor[0],
          newHairColor[1],
          newHairColor[2]
        );
      }
    });
  }, [hair]);

  //By using separate instances of GLTFLoader and faceGLTF for each component instance, we ensure that the loading and rendering of the face mesh is isolated and independent for each avatar. This approach prevents interference and allows each instance to have its own unique face rendering during the initial render.///
  /////Face Mesh ///////
  useEffect(() => {
    const faceGLTFLoader = new GLTFLoader();

    faceGLTFLoader.load(`SM_Dx_EyeCard.glb`, (gltf) => {
      const faceGLTF = gltf;
      const faceMesh = faceGLTF.scene.children[0].clone();

      if (faceGLTF) {
        const headBone = scene.getObjectByName("head");

        // Remove existing face mesh if one exists
        const existingFaceMesh = headBone.getObjectByName("faceMesh");
        if (existingFaceMesh) {
          headBone.remove(existingFaceMesh);
        }

        faceMesh.name = "faceMesh"; // Give a name to the face mesh for easier tracking
        faceMesh.position.set(0.19, 0, 0);
        faceMesh.rotation.set(0, -0.1, -1.6);

        headBone.add(faceMesh);
        console.log("Face mesh added to head bone:", faceMesh.material);

        ////// Face Texture ///////
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(`${face}`);

        texture.flipY = !texture.flipY;

        texture.colorSpace = "srgb";

        const avatarFaceMaterial = faceMesh.material;

        avatarFaceMaterial.map = texture;
        avatarFaceMaterial.needsUpdate = true;
      }
    });
  }, [face]);

  ///// Animations ///////
  useEffect(() => {
    console.log("Available animations: ", actions);
    // console.log("Animations:", animations);

    if (actions.Anim_Idle_Quin_0) {
      actions.Anim_Idle_Quin_0.play();
    } else {
      console.warn("There is no animation named 'idle'");
    }

    console.log("Available animations: ", actions);
    // array of the names of the nodes needed
    var nodesToSelect = ["head", "neck_01", "hand_l", "hand_r"];

    // get the nodes from the scene
    var selectedNodes = nodesToSelect.map((nodeName) =>
      scene.getObjectByName(nodeName)
    );
    // selectedNodes is now an array
  }, [actions, scene]);

  ////// Position ///////
  useEffect(() => {
    console.log("Avatar position changed:", position);
  }, [position]);

  // Create an AxesHelper to visualize the pivot point
  useEffect(() => {
    const axesHelper = new THREE.AxesHelper(5);
    groupRef.current.add(axesHelper);
  }, []);

  ////// Outfit Textures ///////
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

export default AvatarQuin;
