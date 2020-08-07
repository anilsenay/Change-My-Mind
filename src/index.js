// Root index

import React, { useState } from "react";
import { View, Text } from "react-native";

import * as firebase from "firebase";
import * as Google from "expo-google-app-auth";

import {
  firebaseConfig,
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
} from "./consts/firebase.config";

export default function Root({ navigation }) {
  const [isFirstTime, setFirstTime] = useState(true);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user ? "logged in" : "not logged");

      if (user) {
        navigation.replace("Feed");
      } else if (isFirstTime) {
        setFirstTime(false);
        navigation.replace("Welcome");
      } else {
        navigation.replace("Login");
      }
    });
  }

  return <View></View>;
}
