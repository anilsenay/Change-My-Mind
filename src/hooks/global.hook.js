import { useContext } from "react";

import { AppContext, AppContextDispatch } from "../contexts/app.context";

const globalHook = () => {
  const { globalState } = useContext(AppContext);
  const { globalDispatch } = useContext(AppContextDispatch);

  const useGlobalState = () => {
    return globalState;
  };

  const setLoggedUser = (value) => {
    globalDispatch({
      type: "SET_LOGGED_USER",
      payload: value,
    });
  };
  return {
    useGlobalState,
    setLoggedUser,
  };
};

export default globalHook;
