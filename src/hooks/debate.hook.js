import * as firebase from "firebase";
import "firebase/firestore";

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

async function updateDebate(uid, data) {
  return await firebase
    .firestore()
    .collection("Debate")
    .doc(uid)
    .update({ ...data });
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

export { createDebate, getDebate, updateDebate, getAllDebate };
