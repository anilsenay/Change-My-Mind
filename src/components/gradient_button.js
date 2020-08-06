import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../consts/colors";

export default function GradientButton({ text, style, onPress, ...props }) {
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={[Colors.darkPurple, Colors.purple]}
      style={[
        {
          borderRadius: 30,
          width: "100%",
          marginTop: 10,
        },
        style,
      ]}
      start={[0, 0]}
      end={[0.8, 1]}
    >
      <TouchableOpacity
        style={{ width: "100%", padding: 15, alignItems: "center" }}
        onPress={onPress}
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
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
