import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import GradientButton from "../../components/gradient_button";
import ArgumentModal from "./modal.view";

export default function PostButton({
  joinChallenge,
  isNewRound,
  opponentTurn,
}) {
  const [modalText, setModalText] = useState("");

  const sendEvent = (type) => {
    console.log(type);
  };

  return (
    <View style={styles.container}>
      <ArgumentModal
        isVisible={modalText.length > 0}
        setVisible={() => setModalText("")}
        text={modalText}
        sendEvent={sendEvent}
      />
      {joinChallenge && (
        <GradientButton
          style={{ borderRadius: 8 }}
          text="JOIN THE CHALLENGE"
          title="Submit"
          onPress={() => setModalText("Join challenge with an argument")}
        />
      )}
      {isNewRound && (
        <GradientButton
          style={{ borderRadius: 8 }}
          text="START NEW ROUND"
          title="Submit"
          onPress={() => setModalText("Start New Round")}
        />
      )}
      {opponentTurn && (
        <GradientButton
          style={{ borderRadius: 8 }}
          text="YOUR TURN, WRITE YOUR ARGUMENT"
          title="Submit"
          onPress={() => setModalText("Write your argument")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
    padding: 10,
    paddingHorizontal: 16,
  },
  innerContainer: {
    height: 60,
    width: "100%",
  },
});
