import { proxy } from "valtio";

const state = proxy({
  edit: true,
  inSession: false,
  color: "#7BDCB5",
});

export default state;
