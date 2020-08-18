import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Round from "../../components/round";

export default function Rounds({ opponent, proponent }) {
  return (
    <View style={styles.container}>
      <Round opponent={opponent} proponent={proponent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
