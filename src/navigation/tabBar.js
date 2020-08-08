import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import NavigationAddButton from "../components/nav_add_button";
import {
  FeedButton,
  ExploreButton,
  NotificationButton,
  ProfileButton,
} from "./tabBar_icons";
import { Colors } from "../consts/colors";

export function MyTabBar({ state, descriptors, navigation }) {
  const tabBarStyle = {
    flexDirection: "row",
    height: 50,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  };
  const iconStyle = {
    flex: 1,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <View style={tabBarStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return label === "Create" ? (
          <NavigationAddButton key={label} />
        ) : (
          <TouchableOpacity key={label} onPress={onPress} style={iconStyle}>
            {label === "Feed" && (
              <FeedButton
                height={24}
                width={24}
                fill={isFocused ? Colors.purple : Colors.grey}
              />
            )}
            {label === "Explore" && (
              <ExploreButton
                height={24}
                width={24}
                fill={isFocused ? Colors.purple : Colors.grey}
              />
            )}
            {label === "Notifications" && (
              <NotificationButton
                height={28}
                width={28}
                fill={isFocused ? Colors.purple : Colors.grey}
              />
            )}
            {label === "Profile" && (
              <ProfileButton
                height={22}
                width={22}
                fill={isFocused ? Colors.purple : Colors.grey}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
