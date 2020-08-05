import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import Slide from "./welcome_views/slide";
import Footer from "./welcome_views/welcome_footer";

export default function Welcome() {
  const { container, scrollContainer, footer } = styles;

  const [page, setPage] = useState(0);
  const scrollRef = useRef();
  const width = Dimensions.get("window").width;

  const nextPageEvent = () => {
    scrollRef.current.scrollTo({ x: width * (page + 1), y: 0, animated: true });
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
      </Animated.View>
      <View style={footer}>
        <Footer page={page} nextEvent={nextPageEvent} />
      </View>
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
    height: Dimensions.get("window").height * 0.8,
  },
  footer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});
