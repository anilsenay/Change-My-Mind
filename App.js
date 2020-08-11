import { StatusBar } from "expo-status-bar";
import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { GlobalNavigation } from "./src/navigation/global_navigation";
import { navigationRef } from "./src/navigation/root_navigation";
import { NotifierWrapper } from "react-native-notifier";
import { AppProvider } from "./src/contexts/app.context";

export default function App() {
  return (
    <AppProvider>
      <NotifierWrapper>
        <NavigationContainer ref={navigationRef}>
          <GlobalNavigation />
        </NavigationContainer>
      </NotifierWrapper>
    </AppProvider>
  );
}
