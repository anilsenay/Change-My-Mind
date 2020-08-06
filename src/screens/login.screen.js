import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Register from "./register.screen";
import { Colors } from "../consts/colors";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientButton from "../components/gradient_button";

const Tab = createMaterialTopTabNavigator();

export default function LoginNavigator() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: Colors.darkPurple,
          indicatorStyle: {
            backgroundColor: Colors.purple,
          },
          style: {
            borderBottomWidth: 1,
            borderBottomColor: Colors.purple + "99",
          },
        }}
      >
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Register" component={Register} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

function Login() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <GradientButton text="LOGIN" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
});
