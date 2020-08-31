import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { add } from "date-fns";

import GradientButton from "../../components/gradient_button";
import ArgumentModal from "./modal.view";

import debatesHook from "../../hooks/debates.hook";
import {
  createNewRound,
  joinChallenge,
  newArgument,
} from "../../hooks/round.hook";

export default function PostButton({
  join,
  isNewRound,
  opponentTurn,
  refreshEvent,
}) {
  const [modalText, setModalText] = useState("");

  const { useDebatesState } = debatesHook();
  const { current_debate } = useDebatesState();

  const sendEvent = (type, argument) => {
    if (type === "Join challenge with an argument") {
      const finish_date = add(new Date(), {
        days: current_debate.data.voting_period,
        minutes:
          (current_debate.data.round_number - 1) *
          current_debate.data.respond_limit,
      });
      joinChallenge(
        current_debate.data.id,
        current_debate.data.rounds[0],
        argument,
        finish_date
      );
    } else if (type === "Start new round") {
      createNewRound(current_debate.data.id, argument);
    } else if (type === "Write your argument") {
      newArgument(current_debate.data.rounds.slice(-1)[0], argument);
    }
    setModalText("");
    refreshEvent();
  };

  return (
    <View style={styles.container}>
      <ArgumentModal
        isVisible={modalText.length > 0}
        setVisible={() => setModalText("")}
        text={modalText}
        sendEvent={sendEvent}
      />
      {join && (
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
          onPress={() => setModalText("Start new round")}
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
