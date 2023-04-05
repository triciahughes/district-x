import React from "react";
import ue5 from "../UE5";
import ue from "../UE5";

if (typeof ue.interface === "undefined") {
  ue.interface = {};
}

ue.interface.test = function (data) {
  console.log("working");
};

function CreateAvatar() {
  ue5("InitCharacterCreator");
  return <></>;
}

export default CreateAvatar;
