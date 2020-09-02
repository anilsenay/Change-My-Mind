import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/header";
import { Colors } from "../consts/colors";

export default function Notifications() {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Notifications"
        titleAlignment="left"
        rightIcon={
          <View style={styles.markAllContainer}>
            <Text style={styles.markAllText}>Mark all as read</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  markAllContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  markAllText: {
    width: 150,
    padding: 8,
    textAlign: "right",
    fontWeight: "bold",
    color: Colors.purple,
  },
});
