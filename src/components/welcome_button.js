import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Colors } from "../consts/colors";

export default function Button({ text, large, width, arrow, ...props }) {
  return (
    <TouchableOpacity
      style={[styles.button, { width: large ? "100%" : 115 }]}
      {...props}
    >
      <View style={styles.textView}>
        <Text style={styles.text}>{text}</Text>
      </View>
      {arrow && (
        <View style={styles.buttonArrow}>
          <Text style={styles.arrowText}>{">"}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    color: "white",
  },
  textView: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 115,
    height: 50,
    backgroundColor: Colors.purple,
    borderRadius: 30,
    flexDirection: "row",
  },
  buttonArrow: {
    width: 50,
    height: 50,
    backgroundColor: Colors.darkPurple,
    marginLeft: "auto",
    borderRadius: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: {
    color: "white",
    fontSize: 22,
  },
});
