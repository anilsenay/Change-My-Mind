import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/header";
import FilterIcon from "../components/icons/filter";

import Filter from "./feed_views/filter.view";
import FeedItems from "./feed_views/feed.items.view";

import debatesHook from "../hooks/debates.hook";
import { getUser } from "../hooks/firestore.hooks";

export default function Feed() {
  const [hideFilter, setHideFilter] = useState(true);

  const { getAllDebates, useDebatesState } = debatesHook();
  const { debates } = useDebatesState();

  useEffect(() => {
    getAllDebates();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Feed"
        titleAlignment="left"
        rightIcon={<FilterIcon width={24} height={24} fill="black" />}
        rightIconEvent={() => setHideFilter(!hideFilter)}
      />
      <Filter hideFilter={hideFilter} />
      {debates.isFetched && <FeedItems data={debates.results} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
