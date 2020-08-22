import { useContext } from "react";

import { AppContext, AppContextDispatch } from "../contexts/app.context";

import * as firebase from "firebase";
import "firebase/firestore";

const debatesHook = () => {
  const { debatesState } = useContext(AppContext);
  const { debatesDispatch } = useContext(AppContextDispatch);

  const useDebatesState = () => {
    return debatesState;
  };

  const getAllDebates = () => {
    firebase
      .firestore()
      .collection("Debate")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
            start_date: doc.data().start_date.toDate(),
            update_date: doc.data().update_date.toDate(),
            finish_date: doc.data().finish_date?.toDate(),
          };
        });
        debatesDispatch({
          type: "SET_DEBATES",
          payload: data,
        });
      });
  };
  return {
    useDebatesState,
    getAllDebates,
  };
};

export default debatesHook;