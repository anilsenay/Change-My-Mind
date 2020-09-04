import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Dimensions } from "react-native";
import { Colors } from "../../consts/colors";

import Welcome from "../../assets/welcome-1";
import TakeIdea from "../../assets/welcome-2";
import Challenge from "../../assets/welcome-3";

export default function Slide({ title, description, imageComponent, style }) {
  return (
    <View style={[styles.container, style]}>
      {imageComponent === "Welcome" && <Welcome width={250} height={250} />}
      {imageComponent === "TakeCare" && <TakeIdea width={250} height={250} />}
      {imageComponent === "Challenge" && <Challenge width={250} height={250} />}
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
    marginTop: 24,
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
