import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";
import SearchIcon from "../components/icons/search";

export default function Explore() {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Explore"
        titleAlignment="left"
        rightIcon={<SearchIcon width={24} height={24} fill="black" />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
