//Imports the ue5 function from the unrealHelper.js file
import { ue5, ue } from "./unrealHelper";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Trigger Events *in* Unreal Engine with optional JSON data
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const AccountInitialized = (data) => {
  ue5("AccountInitialized", data);
};
export const ViewAccount = (data) => {
  ue5("ViewAccount", data);
};
