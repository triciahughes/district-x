import React, { useState } from "react";
import ArrowIcon from "../../assets/RightArrowIcon.png";
import { act } from "@react-three/fiber";
// import { Enum } from "react";

const RightArrowIcon = ({
  top,
  handleRightOutfitClick,
  handleRightFaceClick,
  handleActiveFunction,
  activeFunction,
  setActiveFunction,
}) => {
  // const [activeArrow, setActiveArrow] = useState("");
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);

  const handleMouseLeave = () => setHovered(false);

  const iconStyle = {
    position: "absolute",
    top,
    right: "20rem",
    transform: `translateY(-50%) ${hovered ? "scale(1.2)" : "scale(1)"}`,
    width: "50px",
    height: "50px",
    transition: "transform 0.3s ease",
  };

  return (
    <img
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={
        () => (
          handleActiveFunction(activeFunction), console.log(activeFunction)
        )
        // handleRightFaceClick()
        //setActiveFunction("nextOutfit"),
      }
      src={ArrowIcon}
      alt="Right Arrow Icon"
      style={iconStyle}
    />
  );
};

export default RightArrowIcon;
