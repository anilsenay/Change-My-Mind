// Root index

import React, { useState } from "react";
import { View, Text, Animated } from "react-native";

import * as firebase from "firebase";

import { firebaseConfig } from "./consts/firebase.config";
import { Colors } from "./consts/colors";

export default function Root({ navigation }) {
  // TODO: this will be local storage state
  const [isFirstTime, setFirstTime] = useState(true);

  const [scaleValue] = useState(new Animated.Value(0));

  const onLoaded = (user) => {
    Animated.timing(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 800,
    }).start(() => {
      navigation.replace("Feed", { uid: user.uid });
    });
  };

  const scaleValueInterpolation = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 20],
  });

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user ? "logged in as" + user.uid : "not logged");
      if (user) {
        onLoaded(user);
        // navigation.replace after onLoaded
      } else if (isFirstTime) {
        // setFirstTime(false);
        navigation.replace("Welcome");
      } else {
        navigation.replace("Login");
      }
    });
  }

  return (
    <View
      style={{
        backgroundColor: Colors.purple,
        flex: 1,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={[
          {
            width: 150,
            height: 150,
            borderRadius: 150,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          },
          { transform: [{ scale: scaleValueInterpolation }] },
        ]}
      >
        <Animated.Text
          style={{
            fontSize: 24,
            color: Colors.purple,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Change My Mind
        </Animated.Text>
      </Animated.View>
    </View>
  );
}
