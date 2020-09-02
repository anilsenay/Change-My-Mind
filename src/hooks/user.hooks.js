import { useState, useEffect } from "react";
import * as firebase from "firebase";
import "firebase/firestore";

function getCurrentUserId() {
  return firebase.auth().currentUser.uid;
}

const getUser = (uid) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    uid &&
      firebase
        .firestore()
        .collection("Users")
        .doc(uid)
        .get()
        .then((doc) => {
          setData({ uid: doc.id, ...doc.data() });
        })
        .catch(function (error) {
          setError(error);
        })
        .finally(() => setLoading(false));
  }, [uid]);
  return { loading, data, error };
};

function updateUser(data) {
  return firebase
    .firestore()
    .collection("Users")
    .doc(firebase.auth().currentUser.uid)
    .update({ ...data });
}

const isUsernameExist = (username) => {
  return firebase
    .firestore()
    .collection("Users")
    .where("username", "==", username)
    .get();
};

const followUser = (uid) => {
  firebase
    .firestore()
    .collection("Users")
    .doc(firebase.auth().currentUser.uid)
    .update({ following: firebase.firestore.FieldValue.arrayUnion(uid) })
    .then(() => {
      firebase
        .firestore()
        .collection("Users")
        .doc(uid)
        .update({
          followers: firebase.firestore.FieldValue.arrayUnion(
            firebase.auth().currentUser.uid
          ),
        });
    });
};

const unfollowUser = (uid) => {
  firebase
    .firestore()
    .collection("Users")
    .doc(firebase.auth().currentUser.uid)
    .update({ following: firebase.firestore.FieldValue.arrayRemove(uid) })
    .then(() => {
      firebase
        .firestore()
        .collection("Users")
        .doc(uid)
        .update({
          followers: firebase.firestore.FieldValue.arrayRemove(
            firebase.auth().currentUser.uid
          ),
        });
    });
};

const uploadImage = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = firebase
    .storage()
    .ref()
    .child("profile_photos/" + getCurrentUserId());
  return ref.put(blob);
};

const reportUser = (id) => {
  firebase.firestore().collection("Reports").add({
    reported_by: firebase.auth().currentUser.uid,
    reported_user: id,
    reported_date: new Date(),
  });
};

export {
  getCurrentUserId,
  getUser,
  updateUser,
  isUsernameExist,
  followUser,
  unfollowUser,
  uploadImage,
  reportUser,
};
