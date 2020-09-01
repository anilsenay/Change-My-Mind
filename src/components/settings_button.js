import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../consts/colors";

export default function SettingsButton({ text, textStyle }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
  },
});
