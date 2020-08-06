// Root index

import React, { useState } from "react";
import { View, Text } from "react-native";
import Welcome from "./screens/welcome_screen";
import Login from "./screens/login_screen";

export default function Root({ navigation }) {
  const [isFirstTime, setFirstTime] = useState(true);
  const [isLogin, setLogin] = useState(false);

  if (isFirstTime) {
    navigation.replace("Welcome");
  } else if (!isLogin) {
    navigation.replace("Login");
  }

  return <View></View>;
}
