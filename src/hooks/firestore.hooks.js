import React from "react";

import * as firebase from "firebase";
import "firebase/firestore";

function getCurrentUserId() {
  return firebase.auth().currentUser.uid;
}

async function registerUser(
  uid,
  username,
  profile_name,
  biography = "",
  imageSrc
) {
  await firebase
    .firestore()
    .collection("Users")
    .doc(uid)
    .set({
      UID: uid,
      username,
      profile_name,
      biography,
      imageSrc,
      debates: [],
      followers: [],
      following: [],
      stats: {
        won: 0,
        lost: 0,
        ongoing: 0,
        points: 10,
      },
    });
}

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

async function createRound(proponent, proponent_msg) {
  return await firebase.firestore().collection("Debate").add({
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

async function getUser(uid = getCurrentUserId()) {
  return await firebase
    .firestore()
    .collection("Users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}

async function getDebate(uid) {
  return await firebase
    .firestore()
    .collection("Debate")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}

async function getRound(uid) {
  return await firebase
    .firestore()
    .collection("Rounds")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}

async function updateUser(uid = getCurrentUserId(), data) {
  return await firebase
    .firestore()
    .collection("Users")
    .doc(uid)
    .update({ ...data });
}

async function updateDebate(uid, data) {
  return await firebase
    .firestore()
    .collection("Debate")
    .doc(uid)
    .update({ ...data });
}

async function updateRound(uid, data) {
  return await firebase
    .firestore()
    .collection("Rounds")
    .doc(uid)
    .update({ ...data });
}

// Temporary hooks to get all data from database, they will be removed later
async function getAllUser() {
  (await firebase.firestore().collection("Users"))
    .get()
    .then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      console.log(data); // setState will be added here
    });
}

async function getAllDebate(setDebates) {
  (await firebase.firestore().collection("Debate"))
    .get()
    .then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setDebates(data); // setState will be added here
    });
}

async function getAllRound() {
  (await firebase.firestore().collection("Rounds"))
    .get()
    .then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      console.log(data); // setState will be added here
    });
}

export {
  getCurrentUserId,
  registerUser,
  createDebate,
  createRound,
  getUser,
  getDebate,
  getRound,
  updateUser,
  updateDebate,
  updateRound,
  // temporary hooks
  getAllUser,
  getAllDebate,
  getAllRound,
};
