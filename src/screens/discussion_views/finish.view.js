import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { isAfter } from "date-fns";

import debatesHook from "../../hooks/debates.hook";

export default function FinishView() {
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

  if (isAfter(new Date(), current_debate.data.finish_date)) {
    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
    );
  } else return null;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 20,
    backgroundColor: "red",
  },
});
