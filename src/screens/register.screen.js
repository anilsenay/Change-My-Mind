import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GradientButton from "../components/gradient_button";

export default function Register() {
  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <GradientButton text="REGISTER" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 40,
    justifyContent: "center",
  },
});
