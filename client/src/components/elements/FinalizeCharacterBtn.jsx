import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
// import { slideAnimation } from "../../config/motion";

const FinalizeCharacterBtn = () => {
  const [hovered, setHovered] = useState(false);
  //   const navigate = useNavigate();
  const navigate = useNavigate();

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const buttonStyle = {
    position: "fixed",
    // left: 600,
    left: 90,
    bottom: -15,
    padding: "15px",
    backgroundColor: `${
      hovered ? "rgba(91, 189, 235, 1)" : "rgba(99, 191, 235, 0.75)"
    }`,
    transform: `translateY(-50%) ${hovered ? "scale(1.1)" : "scale(1)"}`,
    color: "white",
    fontSize: "1rem",
    border: "none",
    borderRadius: "7px",
    width: "50%",
    display: "flex",
    justifyContent: "center",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
    // history("/home");
  };
  //ADD SLIDE ANIMATION
  return (
    <AnimatePresence>
      <motion.div>
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          type="submit"
          style={buttonStyle}
          onSubmit={() => {}}
          onClick={handleSubmit}
        >
          Finalize Avatar
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default FinalizeCharacterBtn;
