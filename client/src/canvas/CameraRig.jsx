import React, { useRef } from "react";

const CameraRig = ({ children }) => {
  const group = useRef();

  return <group ref={group}>{children}</group>;
};

export default CameraRig;

// import React, { useRef } from "react";
// // import { useFrame } from "@react-three/fiber";

// const CameraRig = ({ children }) => {
//   const group = useRef();

// useFrame(({ camera }) => {
//   if (camera) {
//     camera.position.set(0, 0, 12);
//     camera.lookAt(-0.3, 1, 0);
//   }
// });
// const snap = useSnapshot(state);

// useFrame((state, delta) => {
//   const isBreakpoint = window.innerWidth <= 1260;
//   const isMobile = window.innerWidth <= 600;

//   // set the initial position of the model
//   let targetPosition = [-0.4, 0, 0];
//   if (snap.intro) {
//     if (isBreakpoint) targetPosition = [0, 0, 9];
//     if (isMobile) targetPosition = [0, 0.2, 9.5];
//   } else {
//     if (isMobile) targetPosition = [0, 0, 9.5];
//     else targetPosition = [0, 1, 15];
//   }

//   // set model camera position
//   easing.damp3(state.camera.position, targetPosition, 0.5, delta);

//   // set the model rotation smoothly
//   easing.dampE(
//     group.current.rotation,
//     [state.pointer.y / 10, -state.pointer.x / 5, 0],
//     0.25,
//     delta
//   );
// });

//   return <group ref={group}>{children}</group>;
// };

// export default CameraRig;
