import React from "react";

import * as firebase from "firebase";
import "firebase/firestore";

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

export { registerUser, createDebate, createRound };
