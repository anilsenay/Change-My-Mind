import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Colors } from "../consts/colors";

export default function SocialButton({
  text,
  color,
  onPress,
  children,
  ...props
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.childrenContainer}>{children}</View>
      {text && <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  childrenContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1.3,
    borderColor: Colors.purple,
    marginHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.grey,
    marginTop: 4,
  },
});
