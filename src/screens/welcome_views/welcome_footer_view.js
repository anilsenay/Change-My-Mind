import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../../components/welcome_button";

export default function Footer({ page, nextEvent }) {
  return (
    <View style={styles.container}>
      {page !== 2 ? (
        <>
          <TouchableOpacity
            style={[styles.buttonPadding, styles.skip]}
            onPress={() => nextEvent({ toEnd: true })}
          >
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
          <Button onPress={nextEvent} text="Next" arrow />
        </>
      ) : (
        <Button onPress={nextEvent} text="Get Started!" large />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  skip: {
    fontWeight: "bold",
    justifyContent: "flex-start",
    marginRight: "auto",
    color: "grey",
  },
  next: {
    fontWeight: "bold",
    color: "white",
    marginLeft: "auto",
  },
  buttonPadding: {
    padding: 10,
  },
});
