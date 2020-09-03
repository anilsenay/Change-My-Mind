import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import Carousel from "react-native-snap-carousel";

import { Colors } from "../../consts/colors";
import FeedItem from "../../components/feed_item";

export default function CarouselView({ headerText, data }) {
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{headerText}</Text>
        <TouchableOpacity style={{ padding: 8 }}>
          <Text style={styles.viewAllText}>Wiew all</Text>
        </TouchableOpacity>
      </View>
      <Carousel
        data={data}
        renderItem={({ item, index }) => {
          return <FeedItem itemData={item} style={{ padding: 0 }} noHeader />;
        }}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width - 48}
        layout={"default"}
        contentContainerCustomStyle={{
          marginLeft: -4,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: "auto",
  },
  viewAllText: {
    color: Colors.darkPurple,
  },
});
