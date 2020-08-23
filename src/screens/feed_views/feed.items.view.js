import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";

import FeedItem from "../../components/feed_item";

import debatesHook from "../../hooks/debates.hook";

export default function FeedItems({ data }) {
  const [refreshing, setRefreshing] = useState(false);

  const { getAllDebates, fetchMoreDebates, useDebatesState } = debatesHook();
  const { debates } = useDebatesState();

  useEffect(() => {
    getAllDebates();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => setRefreshing(false), 2000); // working like fake fetching
  }, []);

  if (!debates || !debates.isFetched) {
    return (
      <ActivityIndicator
        size="large"
        animating={true}
        color="grey"
        style={{ marginTop: 40 }}
      />
    );
  }
  if (debates.isFetched && debates.results.length === 0) {
    <Text style={{ marginTop: 50, fontSize: 18 }}>Some things went wrong</Text>;
  }
  return (
    <>
      {debates.isFetched && (
        <FlatList
          style={styles.container}
          showsVerticalScrollIndicator={false}
          data={debates.results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FeedItem itemData={item} />}
          ListFooterComponent={<View style={{ marginBottom: 16 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReachedThreshold={0.01}
          onEndReached={() => {
            fetchMoreDebates();
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
