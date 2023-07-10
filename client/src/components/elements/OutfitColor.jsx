import React, { useState } from "react";
import outfitLogo from "../../assets/shirtLogo.png";
import HueSlider from "./HueSlider";
import { useSnapshot } from "valtio";

import state from "../../store";

const OutfitColor = () => {
  const snap = useSnapshot(state);
  const [hovered, setHovered] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () =>
    showPicker ? setHovered(true) : setHovered(false);

  const btnStyle = {
    position: "fixed",
    left: 350,
    top: 100,
    backgroundColor: `${
      hovered ? "rgba(91, 189, 235, 1)" : "rgba(225, 225, 225, .25)"
    }`,
    transform: `translateY(-50%) ${hovered ? "scale(1.1)" : "scale(1)"}`,
    border: "none",
    borderRadius: "7px",
    // width: "2%",
    // height: "2%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const squareSize = 70;

  return (
    <>
      {showPicker ? <HueSlider /> : null}
      <button
        style={{ ...btnStyle, width: squareSize, height: squareSize }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setShowPicker(!showPicker)}
      >
        <img src={outfitLogo} alt="hair logo" style={{ width: "100%" }}></img>
      </button>
    </>
  );
};

export default OutfitColor;
