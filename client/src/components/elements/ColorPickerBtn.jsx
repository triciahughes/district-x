import React, { useState } from "react";
import Swatch from "../../assets/swatch.png";

const ColorPickerBtn = ({ ColorPicker }) => {
  const [hovered, setHovered] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const btnStyle = {
    position: "fixed",
    left: 50,
    top: 150,
    backgroundColor: `${
      hovered ? "rgba(91, 189, 235, 1)" : "rgba(225, 225, 225, .25)"
    }`,
    transform: `translateY(-50%) ${hovered ? "scale(1.1)" : "scale(1)"}`,
    border: "none",
    borderRadius: "7px",
    width: "7%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const squareSize = 70;

  return (
    <>
      <button
        style={{ ...btnStyle, width: squareSize, height: squareSize }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setShowPicker(!showPicker)}
      >
        <img src={Swatch} alt="swatch logo" style={{ width: "100%" }}></img>
      </button>
      {showPicker ? <ColorPicker /> : null}
    </>
  );
};

export default ColorPickerBtn;
