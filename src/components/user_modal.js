import React from "react";
import { StyleSheet, View, Alert } from "react-native";

import { reportUser } from "../hooks/user.hooks";

import ModalButton from "./modal_button";

export default function UserModal({ data, cancelEvent }) {
  console.log(data.proponent);

  const reportUserEvent = () => {
    reportUser(data.uid);
    Alert.alert(
      "Reported Succesfully",
      "Thank you for sharing with us. The debate will be examined by our team."
    );
    cancelEvent();
  };

  const shareEvent = () => {
    Alert.alert("Opps", "Sharing is not supporting yet.");
    cancelEvent();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <ModalButton
          text="Report the user"
          textStyle={{ color: "red" }}
          onPress={reportUserEvent}
        />
        <ModalButton text="Share" onPress={shareEvent} />
        <ModalButton text="Cancel" noBorder onPress={cancelEvent} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 16,
  },
  buttonsContainer: {
    width: "100%",
  },
});
