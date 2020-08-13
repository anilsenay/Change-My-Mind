import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "../screens/login.screen";
import Welcome from "../screens/welcome.screen";
import Feed from "../screens/feed.screen";
import Explore from "../screens/explore.screen";
import Notifications from "../screens/notification.screen";
import Profile from "../screens/profile.screen";
import Create from "../screens/create.screen";

import Root from "../index";
import { MyTabBar } from "./tabBar";

const Stack = createStackNavigator();

export function GlobalNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: true, gestureDirection: "vertical" }}
    >
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
      <Stack.Screen
        name="Feed"
        component={TabScreens}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create"
        component={Create}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const TabScreens = () => {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      {/* tabBar={(props) => <MyTabBar {...props} />} */}
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Create" component={Feed} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
