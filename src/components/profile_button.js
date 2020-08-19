import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../consts/colors";

export default function ProfileButton({ text, style, textStyle, ...props }) {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      <Text style={[styles.textStyle, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontWeight: "bold",
    color: "black",
  },
});
