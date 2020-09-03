import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchModal from "./explore_views/search_modal.view";

import Header from "../components/header";
import SearchIcon from "../components/icons/search";
import Filter from "./explore_views/filter.view";
import CarouselView from "./explore_views/carousel.view";

export default function Explore() {
  const [visible, setVisible] = useState(false);
  const [hideFilter, setHideFilter] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Explore"
        titleAlignment="left"
        rightIcon={<SearchIcon width={24} height={24} fill="black" />}
        rightIconEvent={() => setVisible(true)}
      />
      <Filter hideFilter={hideFilter} />
      <CarouselView headerText="Popular on All" />
      <CarouselView headerText="News on All" />
      <CarouselView headerText="Most Voted on All" />
      <CarouselView headerText="New Updated on All" />

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
