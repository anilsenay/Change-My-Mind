import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Round from "../../components/round";

import { getRounds } from "../../hooks/round.hook";

export default function Rounds({ opponent, proponent, rounds }) {
  const { data, loading } = rounds?.length > 0 ? getRounds(rounds) : [];
  console.log(data, loading, rounds);
  return (
    <View style={styles.container}>
      {data &&
        !loading &&
        data.map((round, index) => {
          return (
            <Round
              key={"" + index}
              opponent={opponent}
              proponent={proponent}
              roundNumber={"" + index + 1}
              data={round}
            />
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
