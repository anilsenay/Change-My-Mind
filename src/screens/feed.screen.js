import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterIcon from "../components/icons/filter";
import Filter from "./feed_views/filter.view";
import FeedItems from "./feed_views/feed.items.view";

export default function Feed() {
  const [hideFilter, setHideFilter] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Feed"
        titleAlignment="left"
        rightIcon={<FilterIcon width={24} height={24} fill="black" />}
        rightIconEvent={() => setHideFilter(!hideFilter)}
      />
      <Filter hideFilter={hideFilter} />
      <FeedItems />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
