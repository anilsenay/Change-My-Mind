import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import Slide from "./welcome_views/slide_view";
import Footer from "./welcome_views/welcome_footer_view";
import Dots from "./welcome_views/dots_view";

export default function Welcome({ navigation }) {
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

  const goLogin = () => navigation.navigate("Login");

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
          <Slide
            title="Welcome to Change My Mind"
            description="Fikirlerin tartışacağı özgür bir alandasınız. Savunacak bir fikriniz varsa hadi başlayalım."
          />
          <Slide
            title="Change My Mind!"
            description="Ortaya bir fikir atın ve gelecek karşı görüşlere karşı bunu savunun!"
          />
          <Slide
            title="You are wrong!"
            description="Bir fikrin yanlış olduğunu mu düşünüyorsunuz? Ona meydan okuyun!"
          />
        </Animated.ScrollView>
        <Dots page={page} />
      </Animated.View>
      <Footer page={page} nextEvent={nextPageEvent} goLogin={goLogin} />
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
    height: Dimensions.get("window").height * 0.82,
    paddingBottom: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5FD",
  },
});
