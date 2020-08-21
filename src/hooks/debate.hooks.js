import * as firebase from "firebase";
import "firebase/firestore";
import { useEffect, useState } from "react";

async function createDebate(
  title,
  category,
  proponent,
  round_number,
  respond_limit
) {
  return await firebase.firestore().collection("Debate").add({
    title,
    category,
    proponent,
    opponent: null,
    start_date: new Date(),
    update_date: new Date(),
    status: "open",
    round_number,
    respond_limit,
    finish_date: null,
    rounds: [],
  });
}

const getDebate = (uid) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    uid &&
      firebase
        .firestore()
        .collection("Debate")
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

const getDebates = (debateArray) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    debateArray &&
      firebase
        .firestore()
        .collection("Debate")
        .where(firebase.firestore.FieldPath.documentId(), "in", debateArray)
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
          setData(fetchedData);
        })
        .catch(function (error) {
          setError(error);
        })
        .finally(() => setLoading(false));
  }, [debateArray]);
  return { loading, data, error };
};

async function updateDebate(uid, data) {
  return await firebase
    .firestore()
    .collection("Debate")
    .doc(uid)
    .update({ ...data });
}

export { createDebate, getDebate, updateDebate, getDebates };
