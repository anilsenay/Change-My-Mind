// Root index

import React, { useState } from "react";
import { View, Text } from "react-native";
import Welcome from "./screens/welcome";
import Login from "./screens/login";

export default function Root() {
  const [isFirstTime, setFirstTime] = useState(true);
  const [isLogin, setLogin] = useState(false);

  if (isFirstTime) {
    return <Welcome />;
  } else if (!isLogin) {
    return <Login />;
  }

  return (
    <View>
      <Text>Root Screen</Text>
    </View>
  );
}
