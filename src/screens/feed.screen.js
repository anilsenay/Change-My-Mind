import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "../components/icons/back";
export default function Feed() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Feed" />
      <Text>Feed</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
