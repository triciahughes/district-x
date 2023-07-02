import { proxy } from "valtio";

const state = proxy({
  edit: true,
  inSession: false,
  color: "#e66465",
});

export default state;
