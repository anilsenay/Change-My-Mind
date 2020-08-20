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

export { registerUser };
