import { proxy } from "valtio";

const state = proxy({
  edit: true,
  inSession: false,
  backDrop: "#7BDCB5",
  clothingData: 0,
  eyeStyle: 5,
  hairColor: "#F78DA7",
  hairStyle: 1,
  skinColor: "#C1C1C1",
});

export default state;
