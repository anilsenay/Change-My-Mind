import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Round from "../../components/round";

export default function Rounds({ opponent, proponent }) {
  return (
    <View style={styles.container}>
      <Round opponent={opponent} proponent={proponent} roundNumber="1" />
      <Round opponent={opponent} proponent={proponent} roundNumber="2" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
