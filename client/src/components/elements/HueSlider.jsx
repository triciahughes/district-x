import React from "react";
import { SketchPicker, SliderPicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "../../store";

const HueSlider = () => {
  const snap = useSnapshot(state);

  const colorPickerStyle = {
    position: "fixed",
    borderRadius: "7px",
    width: "75%",
    // left: 40,
    // top: 200,
  };

  return (
    <div style={colorPickerStyle}>
      <SliderPicker
        color={snap.hairColor}
        onChangeComplete={(hairColor) => (state.hairColor = hairColor.hex)}
      />
    </div>
  );
};

export default HueSlider;
