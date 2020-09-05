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

  const addFavourite = (value) => {
    console.log(value);
    return firebase
      .firestore()
      .collection("Users")
      .doc(firebase.auth().currentUser.uid)
      .update({ favourites: firebase.firestore.FieldValue.arrayUnion(value) })
      .then(() => {
        globalDispatch({
          type: "ADD_FAVOURITE",
          payload: value,
        });
      });
  };
  const removeFavourite = (value) => {
    return firebase
      .firestore()
      .collection("Users")
      .doc(firebase.auth().currentUser.uid)
      .update({ favourites: firebase.firestore.FieldValue.arrayRemove(value) })
      .then(() => {
        globalDispatch({
          type: "REMOVE_FAVOURITE",
          payload: value,
        });
      });
  };

  const fetchFavourites = (debateArray) => {
    debateArray &&
      debateArray.length > 0 &&
      firebase
        .firestore()
        .collection("Debate")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "in",
          debateArray.slice(0, 10)
        )
        .get()
        .then((query) => {
          const fetchedData = query.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
              start_date: doc.data().start_date.toDate(),
              update_date: doc.data().update_date.toDate(),
              finish_date: doc.data().finish_date?.toDate(),
            };
          });
          globalDispatch({
            type: "SET_FAVOURITES",
            payload: fetchedData,
          });
        });
  };
  const fetchMoreFavourites = (debateArray) => {
    debateArray &&
      debateArray.length > 0 &&
      firebase
        .firestore()
        .collection("Debate")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "in",
          debateArray.slice(0, 10)
        )
        .get()
        .then((query) => {
          const fetchedData = query.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
              start_date: doc.data().start_date.toDate(),
              update_date: doc.data().update_date.toDate(),
              finish_date: doc.data().finish_date?.toDate(),
            };
          });
          globalDispatch({
            type: "SET_MORE_FAVOURITES",
            payload: fetchedData,
          });
        });
  };

  return {
    useGlobalState,
    setLoggedUser,
    setNotifications,
    addFavourite,
    removeFavourite,
    fetchFavourites,
    fetchMoreFavourites,
  };
};

export default globalHook;
