import { proxy } from "valtio";

const state = proxy({
  edit: true,
  inSession: false,
});

export default state;
