import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AccountInitialized } from "../unreal/unrealFunctionLibrary";

function CreateAvatar() {
  const history = useHistory();
  AccountInitialized({ name: "test" });

  useEffect(() => {
    // Define the event listener
    const handleAccountFinalized = (event) => {
      console.log("Received data from index.html:", event.detail);
      history.push("/home");
    };

    document.addEventListener("accountFinalized", handleAccountFinalized);

    return () => {
      document.removeEventListener("accountFinalized", handleAccountFinalized);
    };
  }, []);

  return <></>;
}

export default CreateAvatar;
