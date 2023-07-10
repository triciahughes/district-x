import React, { useState } from "react";
import { SketchPicker, SliderPicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "../../store";
import { act } from "@react-three/fiber";

const HueSlider = () => {
  const snap = useSnapshot(state);

  const handleColorChange = (activeColor) => {
    switch (activeColor) {
      case "hair":
        // state.hairColor = color.hex;
        break;
      case "bodyColor":
        bodyColorFunction();
        break;
      case "eyes":
        // state.eyeColor = color.hex;
        break;
      case "outfit":
        // state.outfitColor = color.hex;
        break;
    }
  };

  const bodyColorFunction = (color) => (snap.bodyColor = color.hex);

  const colorPickerStyle = {
    position: "fixed",
    borderRadius: "7px",
    width: "75%",
  };

  return (
    <div style={colorPickerStyle}>
      <SliderPicker color={snap.bodyColor} onChange={handleColorChange} />
    </div>
  );
};

export default HueSlider;
