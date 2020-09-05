import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";
import BackIcon from "../components/icons/back";
import { pop } from "../navigation/root_navigation";

import globalHook from "../hooks/global.hook";
import FeedItem from "../components/feed_item";

export default function Favourites() {
  const { useGlobalState, fetchFavourites, fetchMoreFavourites } = globalHook();
  const { user, favourites } = useGlobalState();

  useEffect(() => {
    user.favourites && fetchFavourites(user.favourites.slice(0, 10));
  }, [user]);

  const fetchMoreEvent = () => {
    fetchMoreFavourites(
      user.favourites.slice(favourites.length, favourites.length + 10)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Favourite Debates"
        leftIcon={<BackIcon width={24} height={24} fill="black" />}
        leftIconEvent={() => pop()}
      />
      {favourites && (
        <FlatList
          data={favourites}
          style={styles.itemsContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FeedItem itemData={item} />}
          onEndReachedThreshold={0.01}
          onEndReached={fetchMoreEvent}
          ListFooterComponent={<View style={{ marginBottom: 16 }} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
