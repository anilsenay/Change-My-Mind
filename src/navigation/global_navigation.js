import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/login.screen";
import Welcome from "../screens/welcome.screen";
import Root from "../index";

const Stack = createStackNavigator();

export function GlobalNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={Root}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
