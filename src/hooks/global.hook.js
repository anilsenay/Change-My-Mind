import { useContext } from "react";

import { AppContext, AppContextDispatch } from "../contexts/app.context";

import * as firebase from "firebase";

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

  const setNotifications = (notifications) => {
    notifications?.length > 0 &&
      firebase
        .firestore()
        .collection("Notifications")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "in",
          notifications.slice(0, 10)
        )
        .get()
        .then((query) => {
          const fetchedData = query.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
              date: doc.data().date.toDate(),
            };
          });
          globalDispatch({
            type: "SET_NOTIFICATIONS",
            payload: fetchedData,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  return {
    useGlobalState,
    setLoggedUser,
    setNotifications,
  };
};

export default globalHook;
