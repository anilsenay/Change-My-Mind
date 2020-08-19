import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Colors } from "../consts/colors";

export default function Dots({ ...props }) {
  return (
    <TouchableOpacity style={styles.dotButton} {...props}>
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dotButton: {
    marginLeft: "auto",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginRight: -8,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: "black",
    borderRadius: 5,
    marginVertical: 1,
  },
});
