import { useContext } from "react";

import { AppContext, AppContextDispatch } from "../contexts/app.context";

import * as firebase from "firebase";
import "firebase/firestore";

const exploreHook = () => {
  const { exploreState } = useContext(AppContext);
  const { exploreDispatch } = useContext(AppContextDispatch);

  const useExploreState = () => {
    return exploreState;
  };

  const getPopularDebates = (category) => {
    const ref =
      category && category !== "All"
        ? firebase
            .firestore()
            .collection("Debate")
            .where("category", "==", category)
        : firebase.firestore().collection("Debate");

    ref
      .orderBy("total_view", "desc")
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

        exploreDispatch({
          type: "SET_POPULAR_DEBATES",
          payload: data,
        });
        exploreDispatch({
          type: "SET_POPULAR_LAST",
          payload: lastData,
        });
      });
  };

  const getNewDebates = (category) => {
    const ref =
      category && category !== "All"
        ? firebase
            .firestore()
            .collection("Debate")
            .where("category", "==", category)
        : firebase.firestore().collection("Debate");

    ref
      .orderBy("start_date", "desc")
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

        exploreDispatch({
          type: "SET_NEW_DEBATES",
          payload: data,
        });
        exploreDispatch({
          type: "SET_NEW_LAST",
          payload: lastData,
        });
      });
  };

  const getMostVotedDebates = (category) => {
    const ref =
      category && category !== "All"
        ? firebase
            .firestore()
            .collection("Debate")
            .where("category", "==", category)
        : firebase.firestore().collection("Debate");

    ref
      .orderBy("total_vote", "desc")
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

        exploreDispatch({
          type: "SET_MOST_VOTED_DEBATES",
          payload: data,
        });
        exploreDispatch({
          type: "SET_MOST_VOTED_LAST",
          payload: lastData,
        });
      });
  };

  const getUpdatedDebates = (category) => {
    const ref =
      category && category !== "All"
        ? firebase
            .firestore()
            .collection("Debate")
            .where("category", "==", category)
        : firebase.firestore().collection("Debate");

    ref
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
        const lastData = querySnapshot.docs[querySnapshot.docs.length - 1];

        exploreDispatch({
          type: "SET_UPDATED_DEBATES",
          payload: data,
        });
        exploreDispatch({
          type: "SET_UPDATED_LAST",
          payload: lastData,
        });
      });
  };

  const fetchMoreDebates = () => {
    const { orderBy, order } = getSortValues();
    exploreState.lastData &&
      firebase
        .firestore()
        .collection("Debate")
        .orderBy(orderBy, order)
        .startAfter(exploreState.lastData)
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

          exploreDispatch({
            type: "SET_DEBATES",
            payload: [...exploreState.debates.results, ...data],
          });
          exploreDispatch({
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
        exploreDispatch({
          type: "SET_DEBATES",
          payload: [...data, ...currentData.results],
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return {
    useExploreState,
    getPopularDebates,
    getNewDebates,
    getMostVotedDebates,
    getUpdatedDebates,
    fetchMoreDebates,
    loadNewDebates,
  };
};

export default exploreHook;
