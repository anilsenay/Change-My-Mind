import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../consts/colors";

export default function GradientButton({ text, style, ...props }) {
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={[Colors.darkPurple, Colors.purple]}
      style={[
        {
          padding: 15,
          alignItems: "center",
          borderRadius: 5,
          width: "100%",
          marginTop: 90,
        },
        style,
      ]}
      start={[0, 0]}
      end={[1, 1]}
    >
      <Text
        style={{
          backgroundColor: "transparent",
          fontSize: 15,
          color: "#fff",
        }}
      >
        {text}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
