import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Dimensions } from "react-native";
import { Colors } from "../../consts/colors";

export default function Slide({ title, description, image, style }) {
  return (
    <View style={[styles.container, style]}>
      {image ? <Image /> : <View style={styles.placeholder} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 48,
  },
  description: {
    marginTop: 16,
    textAlign: "center",
    color: Colors.grey,
  },
  placeholder: {
    width: 200,
    height: 200,
    backgroundColor: Colors.purple,
    borderRadius: 100,
  },
});
