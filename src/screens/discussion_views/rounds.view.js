import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Round from "../../components/round";

import { getRounds } from "../../hooks/round.hook";
import debatesHook from "../../hooks/debates.hook";

export default function Rounds({
  opponent,
  proponent,
  rounds,
  setActiveRound,
}) {
  const { data, loading } = rounds?.length > 0 ? getRounds(rounds) : [];
  console.log(data, loading, rounds);

  const { setRounds } = debatesHook();
  useEffect(() => {
    setRounds(data);
  }, [data]);

  return (
    <View style={styles.container}>
      {data &&
        !loading &&
        data.map((round, index) => {
          Boolean(opponent && proponent)
            ? setActiveRound(index + 2)
            : setActiveRound(index + 1);
          return (
            <Round
              key={"" + index}
              opponent={opponent}
              proponent={proponent}
              roundNumber={index + 1 + ""}
              data={round}
              isOver={Boolean(opponent && proponent)}
            />
          );
        })}
      {!data && !loading && <Text style={styles.loadingText}>Loading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  loadingText: {
    textAlign: "center",
    marginVertical: 8,
  },
});
