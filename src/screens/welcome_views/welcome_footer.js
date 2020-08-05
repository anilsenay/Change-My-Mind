import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export default function Footer({ page, nextEvent }) {
  return (
    <View style={styles.container}>
      <Text style={styles.skip}>Skip</Text>
      <View style={styles.dots}>
        <View
          style={[
            styles.dot,
            { backgroundColor: page === 0 ? "#306FC8" : "grey" },
          ]}
        />
        <View
          style={[
            styles.dot,
            { backgroundColor: page === 1 ? "#306FC8" : "grey" },
          ]}
        />
        <View
          style={[
            styles.dot,
            { backgroundColor: page === 2 ? "#306FC8" : "grey" },
          ]}
        />
      </View>
      {page !== 2 ? (
        <Text style={styles.next} onPress={nextEvent}>
          Next
        </Text>
      ) : (
        <Text style={styles.next}>Get Started!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 30,
    alignItems: "center",
  },
  skip: {
    fontWeight: "bold",
    justifyContent: "flex-start",
    marginRight: "auto",
    color: "grey",
  },
  next: {
    marginLeft: "auto",
    fontWeight: "bold",
    color: "#306FC8",
  },
  dots: {
    flexDirection: "row",
    paddingLeft: 5,
    position: "absolute",
    left: Dimensions.get("window").width / 2 - 24,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "grey",
    borderRadius: 100,
    marginRight: 6,
  },
});
