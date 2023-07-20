import React, { useState, useEffect } from "react";
import hairLogo from "../../assets/hairLogo.png";
import HueSlider from "./HueSlider";
import { useSnapshot } from "valtio";

import state from "../../store";
import { act } from "@react-three/fiber";
import { style } from "@mui/system";

const HairColor = ({
  handleActiveCustomFunction,
  activeCustomFunction,
  setActiveCustomButton,
  // hovered,
  // setHovered,
  // handleMouseEnter,
  // handleMouseLeave,
}) => {
  const snap = useSnapshot(state);
  const [showPicker, setShowPicker] = useState(false);
  const [styleState, setStyleState] = useState({});
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  useEffect(() => {
    if (activeCustomFunction === "hairColor") {
      setStyleState({
        position: "fixed",
        left: 100,
        top: 100,
        border: "none",
        borderRadius: "7px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });
    } else {
      setStyleState({
        position: "fixed",
        left: 100,
        top: 100,
        border: "none",
        borderRadius: "7px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });
      setShowPicker(() => false);
    }
  }, [activeCustomFunction]);

  // const handleMouseEnter = () => setHovered(true);
  // const handleMouseLeave = () =>
  //   showPicker ? setHovered(true) : setHovered(false);

  // const handleCustomState = () => {
  //   if (activeCustomFunction === "hairColor") {
  //     setShowPicker(true);
  //   } else {
  //     setShowPicker(false);
  //   }
  // };

  // const handleStyleState = () => {
  //   if (activeCustomFunction === "hairColor") {
  //     let btnStyle = {
  //       position: "fixed",
  //       left: 100,
  //       top: 100,
  //       backgroundColor: `${
  //         hovered ? "rgba(91, 189, 235, 1)" : "rgba(225, 225, 225, .25)"
  //       }`,
  //       transform: `translateY(-50%) ${hovered ? "scale(1.1)" : "scale(1)"}`,
  //       border: "none",
  //       borderRadius: "7px",
  //       // width: "2%",
  //       // height: "2%",
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     };
  //   } else {
  //     let btnStyle = {
  //       position: "fixed",
  //       left: 100,
  //       top: 100,
  //       backgroundColor: `${
  //         hovered ? "rgba(91, 189, 235, 1)" : "rgba(225, 225, 225, .25)"
  //       }`,
  //       transform: `translateY(-50%) ${hovered ? "scale(1.1)" : "scale(1)"}`,
  //       border: "none",
  //       borderRadius: "7px",
  //       // width: "2%",
  //       // height: "2%",
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     };
  //   }
  // };

  const squareSize = 70;

  return (
    <>
      {showPicker ? (
        <HueSlider activeCustomFunction={activeCustomFunction} />
      ) : null}
      <button
        style={{
          ...styleState,
          width: squareSize,
          height: squareSize,
          background: hovered
            ? "rgba(91, 189, 235, 1)"
            : "rgba(225, 225, 225, .25)",
          transform: `translateY(-50%) ${hovered ? "scale(1.1)" : "scale(1)"}`,
        }}
        // style={}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => (
          setShowPicker(!showPicker),
          // handleActiveCustomFunction(activeCustomFunction),
          setActiveCustomButton(true)
          // handleCustomState()
        )}
      >
        <img src={hairLogo} alt="hair logo" style={{ width: "100%" }}></img>
      </button>
    </>
  );
};

export default HairColor;
