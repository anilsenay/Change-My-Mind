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

  const getProfileDebates = (debatesArray) => {
    debatesArray.length > 0 &&
      firebase
        .firestore()
        .collection("Debate")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "in",
          debatesArray.slice(0, 10)
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
          profileDispatch({
            type: "SET_PROFILE_DEBATES",
            payload: fetchedData,
          });
        })
        .catch(function (error) {
          setError(error);
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
    getProfileDebates,
  };
};

export default debatesHook;
