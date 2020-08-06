import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Colors } from "../consts/colors";

export default function SocialButton({ color, onPress, children, ...props }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1.3,
    borderColor: Colors.purple,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
