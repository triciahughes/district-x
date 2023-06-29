import React, { useState } from "react";
import ArrowIcon from "../../assets/RightArrowIcon.png";

const RightArrowIcon = ({ top }) => {
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
      onClick={() => console.log("Right arrow clicked")}
      src={ArrowIcon}
      alt="Right Arrow Icon"
      style={iconStyle}
    />
  );
};

export default RightArrowIcon;
