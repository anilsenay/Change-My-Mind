import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../consts/colors";

export default function ModalButton({
  text,
  textStyle = {},
  noBorder,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, noBorder && { borderBottomWidth: 0 }]}
      {...props}
    >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
  buttonText: {
    fontSize: 16,
  },
});
