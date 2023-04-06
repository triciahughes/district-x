import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AccountInitialized } from "../unreal/unrealFunctionLibrary";

function CreateAvatar({ fetchUser, user, userId }) {
  const history = useHistory();
  console.log(user);
  console.log(userId);

  AccountInitialized({ name: `${user}` });

  useEffect(() => {
    // Define the event listener
    const handleAccountFinalized = (event) => {
      console.log("Received data from index.html:", event.detail);
      fetchUser();
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
