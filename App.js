import { StatusBar } from "expo-status-bar";
import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { GlobalNavigation } from "./src/navigation/global_navigation";
import { navigationRef } from "./src/navigation/root_navigation";

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <GlobalNavigation />
    </NavigationContainer>
  );
}
