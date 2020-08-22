import React, { useState, useEffect } from "react";
import { StyleSheet, View, RefreshControl, FlatList } from "react-native";
import FeedItem from "../../components/feed_item";

import { feedData } from "../../consts/feed_item_data";

export default function FeedItems({ data }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => setRefreshing(false), 2000); // working like fake fetching
  }, []);
  return (
    <FlatList
      style={styles.container}
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FeedItem itemData={item} />}
      ListFooterComponent={<View style={{ marginBottom: 16 }} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
