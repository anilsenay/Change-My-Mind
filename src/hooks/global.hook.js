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

  const addFavourites = (value) => {
    console.log(value);
    return firebase
      .firestore()
      .collection("Users")
      .doc(firebase.auth().currentUser.uid)
      .update({ favourites: firebase.firestore.FieldValue.arrayUnion(value) })
      .then(() => {
        globalDispatch({
          type: "SET_FAVOURITES",
          payload: value,
        });
      });
  };
  const removeFavourites = (value) => {
    return firebase
      .firestore()
      .collection("Users")
      .doc(firebase.auth().currentUser.uid)
      .update({ favourites: firebase.firestore.FieldValue.arrayRemove(value) })
      .then(() => {
        globalDispatch({
          type: "REMOVE_FAVOURITES",
          payload: value,
        });
      });
  };

  return {
    useGlobalState,
    setLoggedUser,
    setNotifications,
    addFavourites,
    removeFavourites,
  };
};

export default globalHook;
