import * as firebase from "firebase";

function createNotification(title, message, user, debate, owner) {
  firebase
    .firestore()
    .collection("Notifications")
    .add({
      title,
      message,
      date: new Date(),
      debate,
      isRead: false,
      user,
      owner,
    })
    .then((doc) => {
      console.log(doc.id);
      firebase
        .firestore()
        .collection("Users")
        .doc(owner)
        .update({
          notifications: firebase.firestore.FieldValue.arrayUnion(doc.id),
        });
    })
    .catch(function (error) {
      console.log(error);
    });
}

export { createNotification };
