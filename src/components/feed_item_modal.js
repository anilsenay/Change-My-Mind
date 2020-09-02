import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { navigate } from "../navigation/root_navigation";

import { Colors } from "../consts/colors";

import { reportDebate } from "../hooks/debate.hooks";

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

export default function FeedModal({ data, cancelEvent }) {
  const goToDebate = () => {
    navigate("Discussion", {
      data,
    });
    cancelEvent();
  };
  const reportEvent = () => {
    reportDebate(data.id);
    Alert.alert(
      "Reported Succesfully",
      "Thank you for sharing with us. The debate will be examined by our team."
    );
    cancelEvent();
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <ModalButton
          text="Report the debate"
          textStyle={{ color: "red" }}
          onPress={reportEvent}
        />
        <ModalButton text="Go to debate" onPress={goToDebate} />
        <ModalButton text="Share" />
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
