import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { isAfter } from "date-fns";

import debatesHook from "../../hooks/debates.hook";
import { setDebateWin } from "../../hooks/debate.hooks";
import { getCurrentUserId } from "../../hooks/user.hooks";
import GradientButton from "../../components/gradient_button";

export default function FinishView() {
  const [isFinished, setFinished] = useState(false);

  const { useDebatesState } = debatesHook();

  const { current_debate } = useDebatesState();

  const totalProponentVote = current_debate.rounds
    ? current_debate.rounds?.reduce((accumulator, current) => {
        return (
          accumulator +
          current.proponent_like.length -
          current.proponent_dislike.length
        );
      }, 0)
    : 0;
  const totalOpponentVote = current_debate.rounds
    ? current_debate.rounds?.reduce((accumulator, current) => {
        return (
          accumulator +
          current.opponent_like.length -
          current.opponent_dislike.length
        );
      }, 0)
    : 0;

  console.log(totalOpponentVote, totalProponentVote);

  const changeMind = () => {
    // won & lost events
    setDebateWin(
      current_debate.data.id,
      current_debate.data.opponent.uid,
      current_debate.data.proponent.uid,
      "Opponent won"
    );
  };

  if (isAfter(new Date(), current_debate.data.finish_date)) {
    const winner =
      totalProponentVote >= totalOpponentVote ? "Proponent" : "Opponent";
    if (current_debate.data.status === "open" && !isFinished) {
      setFinished(true);
      winner === "Proponent"
        ? setDebateWin(
            current_debate.data.id,
            current_debate.data.proponent.uid,
            current_debate.data.opponent.uid,
            "Proponent won"
          )
        : setDebateWin(
            current_debate.data.id,
            current_debate.data.opponent.uid,
            current_debate.data.proponent.uid,
            "Opponent won"
          );
    }

    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
    );
  } else if (current_debate.data.proponent.uid === getCurrentUserId()) {
    return (
      <View style={styles.container}>
        <GradientButton
          text="Did your change your mind?"
          style={{ borderRadius: 8 }}
          onPress={() => console.log("")}
        />
      </View>
    );
  } else return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
