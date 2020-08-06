// Root index

import React, { useState } from "react";
import { View, Text } from "react-native";

export default function Root({ navigation }) {
  const [isFirstTime, setFirstTime] = useState(true);
  const [isLogin, setLogin] = useState(false);

  if (isFirstTime) {
    setFirstTime(false);
    navigation.replace("Welcome");
  } else if (!isLogin) {
    navigation.replace("Login");
  }

  return <View></View>;
}
