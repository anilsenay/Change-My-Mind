import { useContext } from "react";

import { AppContext, AppContextDispatch } from "../contexts/app.context";

import * as firebase from "firebase";
import "firebase/firestore";

const debatesHook = () => {
  const { profileState } = useContext(AppContext);
  const { profileDispatch } = useContext(AppContextDispatch);

  const useProfileState = () => {
    return profileState;
  };

  const getProfile = (uid) => {
    uid &&
      firebase
        .firestore()
        .collection("Users")
        .doc(uid)
        .get()
        .then((doc) => {
          const data = { uid: doc.id, ...doc.data() };
          profileDispatch({
            type: "SET_PROFILE",
            payload: data,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  const removeProfileState = () => {
    profileDispatch({
      type: "REMOVE_PROFILE_STATE",
      payload: null,
    });
  };

  return {
    useProfileState,
    getProfile,
    removeProfileState,
  };
};

export default debatesHook;
