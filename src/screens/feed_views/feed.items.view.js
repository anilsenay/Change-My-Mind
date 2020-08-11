import React from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import FeedItem from "../../components/feed_item";

import { feedData } from "../../consts/feed_item_data";

export default function FeedItems() {
  return (
    <FlatList
      style={styles.container}
      showsVerticalScrollIndicator={false}
      data={feedData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <FeedItem
          title={item.title}
          category={item.category}
          proponent={item.proponent}
          opponent={item.opponent}
          startDate={item.start_date}
          updateDate={item.update_date}
          status={item.status}
          roundNumber={item.round_number}
          respondLimit={item.respond_limit}
          finishDate={item.finish_date}
        />
      )}
      ListFooterComponent={<View style={{ marginBottom: 16 }} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
