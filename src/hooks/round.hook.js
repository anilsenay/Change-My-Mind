import * as firebase from "firebase";
import "firebase/firestore";
import { useEffect, useState } from "react";

async function createRound(proponent, proponent_msg) {
  return await firebase.firestore().collection("Rounds").add({
    proponent,
    proponent_msg,
    opponent: null,
    opponent_msg: null,
    proponent_date: new Date(),
    opponent_date: null,
    proponent_like: 0,
    opponent_like: 0,
    proponent_dislike: 0,
    opponent_dislike: 0,
  });
}

const getRound = (uid) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    uid &&
      firebase
        .firestore()
        .collection("Rounds")
        .doc(uid)
        .get()
        .then((doc) => {
          setData({
            id: doc.id,
            ...doc.data(),
            start_date: doc.data().start_date.toDate(),
            update_date: doc.data().update_date.toDate(),
            finish_date: doc.data().finish_date?.toDate(),
          });
        })
        .catch(function (error) {
          setError(error);
        })
        .finally(() => setLoading(false));
  }, [uid]);
  return { loading, data, error };
};

const getRounds = (roundsArray) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    roundsArray &&
      firebase
        .firestore()
        .collection("Rounds")
        .where(firebase.firestore.FieldPath.documentId(), "in", roundsArray)
        .get()
        .then((query) => {
          const fetchedData = query.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
              proponent_date: doc.data().proponent_date?.toDate(),
              opponent_date: doc.data().opponent_date?.toDate(),
            };
          });

          setData(fetchedData);
        })
        .catch(function (error) {
          setError(error);
        })
        .finally(() => setLoading(false));
  }, [roundsArray]);
  return { loading, data, error };
};

async function updateRound(uid, data) {
  return await firebase
    .firestore()
    .collection("Rounds")
    .doc(uid)
    .update({ ...data });
}

export { createRound, getRound, updateRound, getRounds };
