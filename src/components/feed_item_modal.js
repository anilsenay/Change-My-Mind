import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { navigate } from "../navigation/root_navigation";

import { Colors } from "../consts/colors";

import { reportDebate } from "../hooks/debate.hooks";
import { reportUser } from "../hooks/user.hooks";

const ModalButton = ({ text, textStyle = {}, noBorder, ...props }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, noBorder && { borderBottomWidth: 0 }]}
      {...props}
    >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default function FeedModal({ data, cancelEvent, inDebate }) {
  console.log(data.proponent);
  const goToDebate = () => {
    navigate("Discussion", {
      data,
    });
    cancelEvent();
  };

  const reportDebateEvent = () => {
    reportDebate(data.id);
    Alert.alert(
      "Reported Succesfully",
      "Thank you for sharing with us. The debate will be examined by our team."
    );
    cancelEvent();
  };

  const reportUserEvent = (uid) => {
    reportUser(uid);
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
      <View style={styles.buttonContainer}>
        <ModalButton
          text="Report the debate"
          textStyle={{ color: "red" }}
          onPress={reportDebateEvent}
        />
        {!inDebate && <ModalButton text="Go to debate" onPress={goToDebate} />}
        {inDebate && (
          <ModalButton
            text="Report the proponent"
            textStyle={{ color: "red" }}
            onPress={() => reportUserEvent(data.proponent.uid)}
          />
        )}
        {inDebate && data.opponent?.uid && (
          <ModalButton
            text="Report the opponent"
            textStyle={{ color: "red" }}
            onPress={() => reportUserEvent(data.opponent.uid)}
          />
        )}
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
  buttonContainer: {
    width: "100%",
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
  buttonText: {
    fontSize: 16,
  },
});