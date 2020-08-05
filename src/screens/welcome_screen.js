import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import Slide from "./welcome_views/slide_view";
import Footer from "./welcome_views/welcome_footer_view";
import Dots from "./welcome_views/dots_view";

export default function Welcome() {
  const { container, scrollContainer, footer } = styles;

  const [page, setPage] = useState(0);
  const scrollRef = useRef();
  const width = Dimensions.get("window").width;

  const nextPageEvent = ({ toEnd }) => {
    scrollRef.current.scrollTo({
      x: width * (toEnd ? 2 : page + 1),
      y: 0,
      animated: true,
    });
  };

  return (
    <View style={container}>
      <Animated.View style={scrollContainer}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          snapToInterval={width}
          decelerationRate={0.9}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={(e) =>
            e.nativeEvent.contentOffset.x % width === 0 &&
            setPage(e.nativeEvent.contentOffset.x / width)
          }
        >
          <Slide label="test" />
          <Slide label="test2" />
          <Slide label="test3" />
        </Animated.ScrollView>
        <Dots page={page} />
      </Animated.View>
      <Footer page={page} nextEvent={nextPageEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    alignItems: "center",
    height: Dimensions.get("window").height * 0.8,
    paddingBottom: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5FD",
  },
});
