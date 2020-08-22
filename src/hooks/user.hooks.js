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

export { getCurrentUserId, getUser };
