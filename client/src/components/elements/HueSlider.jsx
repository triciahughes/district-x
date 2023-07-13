import React, { useState } from "react";
import { SketchPicker, SliderPicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "../../store";
import { act } from "@react-three/fiber";

const HueSlider = ({ activeCustomFunction }) => {
  const snap = useSnapshot(state);

  const currentColor = snap[activeCustomFunction].replace(/"/g, "");

  console.log(currentColor);

  const handleColorChange = (activeCustomFunction, color) => {
    switch (activeCustomFunction) {
      case "hairColor":
        state.hairColor = color.hex;
        break;
      case "bodyColor":
        state.bodyColor = color.hex;
        break;
    }
  };

  const colorPickerStyle = {
    position: "fixed",
    borderRadius: "7px",
    width: "75%",
  };

  return (
    <div style={colorPickerStyle}>
      <SliderPicker
        color={currentColor}
        onChange={(color) => handleColorChange(activeCustomFunction, color)}
      />
    </div>
  );
};

export default HueSlider;
