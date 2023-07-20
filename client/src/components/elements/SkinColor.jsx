import React, { useState, useEffect } from "react";
import HueSlider from "./HueSlider";
import bodyLogo from "../../assets/bodyLogo.png";

const SkinColor = ({
  colorPicker,
  handleActiveCustomFunction,
  activeCustomFunction,
  setActiveCustomButton,
  activeCustomButton,
  // hovered,
  // setHovered,
  // handleMouseEnter,
  // handleMouseLeave,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [styleState, setStyleState] = useState({});
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  useEffect(() => {
    if (activeCustomFunction === "skinColor") {
      setHovered(true);
      setStyleState({
        position: "fixed",
        left: 180,
        top: 100,
        // backgroundColor: `${
        //   hovered ? "rgba(91, 189, 235, 1)" : "rgba(225, 225, 225, .25)"
        // }`,
        // transform: `translateY(-50%) ${hovered ? "scale(1.1)" : "scale(1)"}`,
        border: "none",
        borderRadius: "7px",
        // width: "2%",
        // height: "2%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });
    } else {
      setHovered(false);
      setStyleState({
        position: "fixed",
        left: 180,
        top: 100,
        // backgroundColor: `${
        //   hovered ? "rgba(91, 189, 235, 1)" : "rgba(225, 225, 225, .25)"
        // }`,
        // transform: `translateY(-50%) ${hovered ? "scale(1.1)" : "scale(1)"}`,
        border: "none",
        borderRadius: "7px",
        // width: "2%",
        // height: "2%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });
    }
  }, [activeCustomFunction, hovered]);

  // const handleMouseEnter = () => setHovered(true);
  // const handleMouseLeave = () =>
  //   showPicker ? setHovered(true) : setHovered(false);

  // const handleCustomState = () => {
  //   if (activeCustomFunction === "skinColor") {
  //     setShowPicker(true);
  //   } else {
  //     setShowPicker(false);
  //   }
  // };

  // if (activeCustomFunction === "skinColor") {
  //   console.log("skinColor is active");
  // }

  // const btnStyle = {
  //   position: "fixed",
  //   left: 180,
  //   top: 100,
  //   backgroundColor: `${
  //     hovered ? "rgba(91, 189, 235, 1)" : "rgba(225, 225, 225, .25)"
  //   }`,
  //   transform: `translateY(-50%) ${hovered ? "scale(1.1)" : "scale(1)"}`,
  //   border: "none",
  //   borderRadius: "7px",
  //   // width: "2%",
  //   // height: "2%",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => (
          setShowPicker(!showPicker),
          setHovered(!hovered),
          // handleActiveCustomFunction(activeCustomFunction),
          setActiveCustomButton(
            activeCustomFunction === true || activeCustomFunction === null
              ? false
              : null
          )
          // handleCustomState()
        )}
      >
        <img src={bodyLogo} alt="body logo" style={{ width: "100%" }}></img>
      </button>
    </>
  );
};

export default SkinColor;
