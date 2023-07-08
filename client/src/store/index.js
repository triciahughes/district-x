import { proxy } from "valtio";

const state = proxy({
  edit: true,
  inSession: false,
  color: "#7BDCB5",
  hairColor: "#F78DA7",
});

export default state;
