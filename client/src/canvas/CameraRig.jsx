import React, { useRef } from "react";

const CameraRig = ({ children }) => {
  const group = useRef();

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
