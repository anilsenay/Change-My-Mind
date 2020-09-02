import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchModal from "./explore_views/search_modal.view";

import Header from "../components/header";
import SearchIcon from "../components/icons/search";

export default function Explore() {
  const [visible, setVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Explore"
        titleAlignment="left"
        rightIcon={<SearchIcon width={24} height={24} fill="black" />}
        rightIconEvent={() => setVisible(true)}
      />
      <SearchModal visible={visible} setVisible={setVisible} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
