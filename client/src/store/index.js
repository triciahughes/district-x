import { proxy } from "valtio";

const state = proxy({
  edit: true,
  inSession: false,
  color: "#7BDCB5",
  hairColor: "#F78DA7",
  bodyColor: "#C1C1C1",
  // outfitColor: "#FF0000",
});

export default state;
