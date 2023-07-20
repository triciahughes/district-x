import React, { useState } from "react";
import { SketchPicker, TwitterPicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "../../store";

const ColorPicker = ({ colorPickerStyle }) => {
  const snap = useSnapshot(state);

  const btnStyle = {
    position: "fixed",
    left: 40,
    top: 200,
  };

  return (
    <div style={colorPickerStyle}>
      <TwitterPicker
        color={snap.backDrop}
        onChangeComplete={(color) => (state.backDrop = color.hex)}
      />
    </div>
  );
};

export default ColorPicker;
