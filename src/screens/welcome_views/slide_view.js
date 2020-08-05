import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export default function Slide({ label, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
