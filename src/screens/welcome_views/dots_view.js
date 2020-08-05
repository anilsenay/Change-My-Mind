import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { Colors } from "../../consts/colors";

export default function Dots({ page }) {
  return (
    <View style={styles.dots}>
      <View
        style={[
          styles.dot,
          {
            backgroundColor: page === 0 ? Colors.purple : "grey",
            width: page === 0 ? 22 : 8,
          },
        ]}
      />
      <View
        style={[
          styles.dot,
          {
            backgroundColor: page === 1 ? Colors.purple : "grey",
            width: page === 1 ? 22 : 8,
          },
        ]}
      />
      <View
        style={[
          styles.dot,
          {
            backgroundColor: page === 2 ? Colors.purple : "grey",
            width: page === 2 ? 22 : 8,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dots: {
    flexDirection: "row",
    paddingLeft: 5,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "grey",
    borderRadius: 100,
    marginRight: 6,
  },
});
