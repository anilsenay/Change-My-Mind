import { useContext } from "react";

import { AppContext, AppContextDispatch } from "../contexts/app.context";

import * as firebase from "firebase";
import "firebase/firestore";

import filterHook from "./filter.hook";

import { quaryValues } from "../consts/sort_values";

const debatesHook = () => {
  const { debatesState } = useContext(AppContext);
  const { debatesDispatch } = useContext(AppContextDispatch);

  const { useFilterState, getSortValues } = filterHook();

  const useDebatesState = () => {
    return debatesState;
  };

  const getAllDebates = (order_data) => {
    const { sortSelection } = useFilterState();
    const { orderBy, order } = order_data
      ? quaryValues[order_data]
      : quaryValues[sortSelection];
    console.log("getall: ", orderBy, order);
    firebase
      .firestore()
      .collection("Debate")
      .orderBy(orderBy, order)
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
        const lastData = querySnapshot.docs[querySnapshot.docs.length - 1];

        debatesDispatch({
          type: "SET_DEBATES",
          payload: data,
        });
        debatesDispatch({
          type: "SET_DEBATES_LAST",
          payload: lastData,
        });
      });
  };

  const fetchMoreDebates = () => {
    const { orderBy, order } = getSortValues();
    debatesState.lastData &&
      firebase
        .firestore()
        .collection("Debate")
        .orderBy(orderBy, order)
        .startAfter(debatesState.lastData)
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
          const lastData = querySnapshot.docs[querySnapshot.docs.length - 1];

          debatesDispatch({
            type: "SET_DEBATES",
            payload: [...debatesState.debates.results, ...data],
          });
          debatesDispatch({
            type: "SET_DEBATES_LAST",
            payload: lastData,
          });
        });
  };

  const loadNewDebates = (currentData, setLoading) => {
    const { orderBy, order } = getSortValues();

    console.log(currentData);
    firebase
      .firestore()
      .collection("Debate")
      .orderBy(orderBy, order)
      .endBefore(currentData.results[0][orderBy])
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
