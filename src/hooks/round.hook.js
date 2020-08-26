import * as firebase from "firebase";
import "firebase/firestore";
import { useEffect, useState } from "react";

import { increaseVote, decreaseVote } from "./debate.hooks";

// this function is not using for creating debate anymore, maybe i will use this for new rounds later
function createRound(proponent, proponent_msg) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebase
      .firestore()
      .collection("Rounds")
      .add({
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
      })
      .then((doc) => {
        setData(doc.id);
      })
      .catch(function (error) {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);
  return { loading, data, error };
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

function addLike(uid, user, debateId) {
  firebase
    .firestore()
    .collection("Rounds")
    .doc(uid)
    .update(
      user === "proponent"
        ? {
            proponent_like: firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.uid
            ),
          }
        : {
            opponent_like: firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.uid
            ),
          }
    )
    .finally(() => increaseVote(debateId));
}

function deleteLike(uid, user, debateId) {
  firebase
    .firestore()
    .collection("Rounds")
    .doc(uid)
    .update(
      user === "proponent"
        ? {
            proponent_like: firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.uid
            ),
          }
        : {
            opponent_like: firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.uid
            ),
          }
    )
    .finally(() => decreaseVote(debateId));
}

function addDislike(uid, user, debateId) {
  firebase
    .firestore()
    .collection("Rounds")
    .doc(uid)
    .update(
      user === "proponent"
        ? {
            proponent_dislike: firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.uid
            ),
          }
        : {
            opponent_dislike: firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.uid
            ),
          }
    )
    .finally(() => increaseVote(debateId));
}

function deleteDislike(uid, user, debateId) {
  firebase
    .firestore()
    .collection("Rounds")
    .doc(uid)
    .update(
      user === "proponent"
        ? {
            proponent_dislike: firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.uid
            ),
          }
        : {
            opponent_dislike: firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.uid
            ),
          }
    )
    .finally(() => decreaseVote(debateId));
}

export {
  createRound,
  getRound,
  updateRound,
  getRounds,
  addLike,
  deleteLike,
  addDislike,
  deleteDislike,
};
