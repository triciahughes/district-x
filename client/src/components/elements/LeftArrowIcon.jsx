import React, { useState } from "react";
import ArrowIcon from "../../assets/LeftArrowIcon.png";

const LeftArrowIcon = ({ top }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);

  const handleMouseLeave = () => setHovered(false);

  const iconStyle = {
    position: "absolute",
    top,
    left: "20rem",
    transform: `translateY(-50%) ${hovered ? "scale(1.2)" : "scale(1)"}`,
    width: "50px",
    height: "50px",
    transition: "transform 0.3s ease",
  };
  return (
    <img
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => console.log("Left arrow clicked")}
      src={ArrowIcon}
      alt="Left Arrow Icon"
      style={iconStyle}
    />
  );
};

export default LeftArrowIcon;
