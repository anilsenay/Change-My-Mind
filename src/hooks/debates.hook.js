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
      .orderBy("update_date", "desc")
      .limit(5)
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

  const fetchMoreDebates = () => {
    firebase
      .firestore()
      .collection("Debate")
      .orderBy("update_date", "desc")
      .startAfter(debatesState.debates.results.slice(-1)[0].update_date)
      .limit(5)
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
          payload: [...debatesState.debates.results, ...data],
        });
      });
  };

  const loadNewDebates = (currentData, setLoading) => {
    console.log(currentData);
    firebase
      .firestore()
      .collection("Debate")
      .orderBy("update_date", "desc")
      .endBefore(currentData.results[0].update_date)
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
          payload: [...data, ...currentData.results],
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const getDebate = (uid) => {
    firebase
      .firestore()
      .collection("Debate")
      .doc(uid)
      .get()
      .then((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
          start_date: doc.data().start_date.toDate(),
          update_date: doc.data().update_date.toDate(),
          finish_date: doc.data().finish_date?.toDate(),
        };
        debatesDispatch({
          type: "SET_CURRENT_DEBATE",
          payload: data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeDebateState = () => {
    debatesDispatch({
      type: "REMOVE_CURRENT_DEBATE",
      payload: null,
    });
  };

  return {
    useDebatesState,
    getAllDebates,
    fetchMoreDebates,
    loadNewDebates,
    getDebate,
    removeDebateState,
  };
};

export default debatesHook;
