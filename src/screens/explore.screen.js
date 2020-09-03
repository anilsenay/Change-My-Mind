import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/header";
import SearchIcon from "../components/icons/search";

import SearchModal from "./explore_views/search_modal.view";
import Filter from "./explore_views/filter.view";
import CarouselView from "./explore_views/carousel.view";

import exploreHook from "../hooks/explore.hooks";

export default function Explore() {
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    getPopularDebates,
    getMostVotedDebates,
    getNewDebates,
    getUpdatedDebates,
    useExploreState,
  } = exploreHook();

  const { popular, news, mostVoted, newUpdated } = useExploreState();

  useEffect(() => {
    getPopularDebates(selectedCategory);
    getMostVotedDebates(selectedCategory);
    getNewDebates(selectedCategory);
    getUpdatedDebates(selectedCategory);
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Explore"
        titleAlignment="left"
        rightIcon={<SearchIcon width={24} height={24} fill="black" />}
        rightIconEvent={() => setVisible(true)}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Filter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {popular?.isFetched && (
          <CarouselView headerText="Popular on All" data={popular.results} />
        )}
        {news?.isFetched && (
          <CarouselView headerText="News on All" data={news.results} />
        )}
        {mostVoted?.isFetched && (
          <CarouselView
            headerText="Most Voted on All"
            data={mostVoted.results}
          />
        )}
        {newUpdated?.isFetched && (
          <CarouselView
            headerText="New Updated on All"
            data={newUpdated.results}
          />
        )}
      </ScrollView>
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
